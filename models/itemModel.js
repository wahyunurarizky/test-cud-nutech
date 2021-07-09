const mongoose = require('mongoose');
const slugify = require('slugify');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Item Name can not be empty!'],
    unique: true,
  },
  photo: {
    type: String,
    required: [true, 'Photo can not be empty'],
  },
  buy_price: {
    type: Number,
    required: [true, 'buy price not be empty'],
  },
  sell_price: {
    type: Number,
    required: [true, 'sell price can not be empty'],
  },
  stock: {
    type: Number,
    required: [true, 'stock cann not be empty'],
  },
  slug: String,
});

itemSchema.index({ name: 1 }, { unique: true });

itemSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
