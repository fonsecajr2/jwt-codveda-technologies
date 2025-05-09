const express = require('express')
const { signup, login } = require('../controllers/authController')
// const { authenticateUser, authorizeRoles } = requires('../middleware/authMiddleware')

const router = express.Router()

router.post('/signup', signup)
console.log("signing up")
// router.login('/login', login)

//protected route for frontend
// router.get('/admin', authenticateUser, authorizeRoles('admin'), (req, res) => {
//     res.send('Admin content')
// })

module.exports = router