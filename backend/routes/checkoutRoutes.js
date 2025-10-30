const express = require('express');
const router = express.Router();
const { processCheckout } = require('../controllers/checkoutController');

router.post('/', processCheckout);

module.exports = router;
