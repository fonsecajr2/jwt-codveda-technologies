const jwt = require('jsonwebtoken')

exports.authenticateUser = ( req, res, next ) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(401).json({message: 'Acess denied: No token provided'})

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch(err) {
        res.status(403).json({ message: 'Invalid Token'})
    }
}

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(203).json({ message: "Forbidden: Access denied" })
        }
        next()
    }
}

