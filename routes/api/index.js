const router = require('express').Router()
const authRoutes = require('./auth');
const custRoutes = require('./customer');
const subRoutes = require('./subscriptions');

// customer authorization route
//url /api/auth
router.use('/auth', authRoutes)

//url /api/customer
router.use('/customer', custRoutes)

//url /api/subscription
router.use('/subscription', subRoutes)

module.exports = router;