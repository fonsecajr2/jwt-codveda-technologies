const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User")

const createToken = (user) => {
    return jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, { expiresIn: '1d'})
}

exports.signup = async (req, res) => {
    try {
        console.log("Trying to signup")
        const { username, email, password, role } = req.body
        const hashedPassowrd = await bcrypt.hash(password, 10)
        const newUser = await User.create({ username, email, password: hashedPassowrd, role })
        const token = createToken(newUser)
        res.cookie('token', token, { httpOnly: true})
        res.status(201).json({message: 'User created successfully', user: newUser._id})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({email})
        if (!user) return res.status(404).json({message: 'User not found'})

        const match = await bcrypt.compare(password, user.password)
        if (!match) return res.status(401).json({message: 'Invalid password'})

        const token = createToken(user)
        res.cookie('token', token, {httpOnly: true})
        res.status(200).json({message: 'User logged in successfully', user: user._id})
    } catch(err) {
        res.status(400).json({error: err.message})
    }
}