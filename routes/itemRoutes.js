const express = require('express');
const itemController = require('../controllers/itemControllers');
const authController = require('../controllers/authControllers');

const router = express.Router();
router.use(authController.protect);

router
  .route('/')
  .get(itemController.getAllItems)
  .post(itemController.uploadPhoto, itemController.createItem);

router
  .route('/:id')
  .get(itemController.getOneItem)
  .patch(itemController.uploadPhoto, itemController.updateItem)
  .delete(itemController.deleteItem);

module.exports = router;
