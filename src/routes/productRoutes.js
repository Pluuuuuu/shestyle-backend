const express = require('express');
const { isAdmin } = require('../middlewares/authMiddleware');
const productController = require('../controllers/productController');

const router = express.Router();

router.post('/add', isAdmin, productController.addProduct);
router.delete('/delete/:id', isAdmin, productController.deleteProduct);

module.exports = router;


//example code