const express = require('express');
const router = express.Router();
const bookingController = require('../Controller/bookingController');
const { authenticateToken } = require('../middleware/auth');

// All booking routes require user authentication
router.use(authenticateToken);

router.post('/create-order', bookingController.createOrder);
router.post('/verify-payment', bookingController.verifyPayment);
router.get('/my-bookings', bookingController.getMyBookings);
router.get('/:id', bookingController.getBookingById);

module.exports = router;
