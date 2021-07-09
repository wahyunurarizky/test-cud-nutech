const multer = require('multer');
const sharp = require('sharp');
const Item = require('../models/itemModel');
const factory = require('./handleFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// const multerStorage = multer.memoryStorage();
const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/items');
  },
  filename: function (req, file, cb) {
    cb(null, `item-${Date.now()}.png`);
  },
});
const multerFilter = (req, file, cb) => {
  console.log(file);
  // if (file.mimetype.startsWith('image')) {
  if (
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png'
  ) {
    cb(null, true);
  } else {
    cb(new AppError('tidak bisa upload selain format JPG / PNG', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 100000 },
});

exports.uploadPhoto = upload.single('photo');
exports.resizePhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `items-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

exports.getAllItems = factory.getAll(Item);
exports.getOneItem = factory.getOne(Item);
exports.createItem = factory.createOne(Item);
exports.updateItem = factory.updateOne(Item);
exports.deleteItem = factory.deleteOne(Item);
