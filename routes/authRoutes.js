const express = require('express')
const { signup, login, users } = require('../controllers/authController')
const { authenticateUser, authorizeRoles } = require('../middlewares/authMiddlewares')

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/users', users, authenticateUser, authorizeRoles('admin'))

//protected route for frontend
router.get('/admin', authenticateUser, authorizeRoles('admin'), (req, res) => {
    res.send('Admin content')
})



module.exports = router