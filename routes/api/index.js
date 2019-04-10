const router = require('express').Router()
const authRoutes = require('./auth');
const custRoutes = require('./customer');
const passwordRoutes = require('./password');
const subRoutes = require('./subscriptions');

// customer authorization route
//url /api/auth
router.use('/auth', authRoutes)

//url /api/customer
router.use('/customer', custRoutes)

//url /api/password
router.use('/password', passwordRoutes)

//url /api/subscription
router.use('/subscription', subRoutes)

module.exports = router;