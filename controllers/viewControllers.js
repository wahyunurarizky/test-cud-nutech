const Item = require('../models/itemModel');
const catchAsync = require('../utils/catchAsync');

exports.showItems = catchAsync(async (req, res, next) => {
  const items = await Item.find();

  res.status(200).render('item', { items });
});

exports.showDetail = catchAsync(async (req, res, next) => {
  const item = await Item.findOne({ slug: req.params.slug });
  console.log(item);
  res.status(200).render('itemDetail', { item });
});
