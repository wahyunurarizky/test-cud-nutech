/* eslint-disable arrow-body-style */
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  console.log(token);
  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  });

  // menghilangkan dari output. ini tidak akan merubah database karena kta tidak melakukan save
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.isLoggedIn = async (req, res, next) => {
  try {
    // 1) getting token and check is it's there
    if (req.cookies.jwt) {
      // 2) validate token is valid or not / verification token
      // promisify untuk membuat function menjadi promise
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      // decoded = { id: '606834ffaafb1932b8a83c08', iat: 1617444009, exp: 1620036009 }

      // 3) check if user still exist
      const freshUser = await User.findById(decoded.id);
      if (!freshUser) return next();

      // 4) check if user changed password after the jwt was issued
      if (freshUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      // there is a logged in user
      res.locals.user = freshUser;
      return next();
    }

    next();
  } catch (err) {
    return next();
  }
};

exports.login = catchAsync(async (req, res, next) => {
  console.log('asdasd');
  const { username, password } = req.body;
  if (!username || !password) {
    return next(new AppError('please provide username and password', 400));
  }

  const user = await User.findOne({ username }).select('+password');
  console.log(user);

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('incorrect username or password', 401));
  }

  createSendToken(user, 200, req, res);
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: 'success',
  });
};

exports.protect = catchAsync(async (req, res, next) => {
  // 1) getting token and check is it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Bearer asdsadaskjsoid aodijasidjaodiaohsidaoh so split sapasi dan get aray 1
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  // jika tidak ada token pada authorization header
  if (!token) {
    return next(
      new AppError('you are not logged in, please logini to get access', 401)
    );
  }

  // 2) validate token is valid or not / verification token
  // promisify untuk membuat function menjadi promise
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // decoded = { id: '606834ffaafb1932b8a83c08', iat: 1617444009, exp: 1620036009 }

  // 3) check if user still exist
  const freshUser = await User.findById(decoded.id);
  if (!freshUser)
    return next(
      new AppError('The user belonging to this token does not exist', 401)
    );

  // bisa akses ke protected route
  req.user = freshUser;
  res.locals.user = freshUser;
  // ini sangat penting karena req.user bisa digunakan kedepannya
  next();
});
