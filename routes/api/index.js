const router = require('express').Router()
const authRoutes = require('./auth');
const subRoutes = require('./subscriptions');

// customer authorization route
//url /api/auth
router.use('/auth', authRoutes)

//url /api/subscription
router.use('/subscription', subRoutes)

module.exports = router;