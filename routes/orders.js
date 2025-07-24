const express = require('express');
const orderController = require('../controllers/orderController');
const { auth, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, orderController.placeOrder);
router.get('/', auth, orderController.getOrdersForUser);
router.put('/:id/status', auth, isAdmin, orderController.updateOrderStatus);

module.exports = router;
