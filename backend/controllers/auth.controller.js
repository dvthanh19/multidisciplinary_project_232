const User=require('../models/user.model')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;

const Login = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if (!user) {
            return res.status(400).json({message: 'User not found'});
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).json({message: 'Invalid password'});
        }

        const token = jwt.sign({_id: user._id}, jwtSecret , { expiresIn: '1h' }); // Expires in 1 hour
        return res.status(200).json({ token, user: { id: user._id, email: user.email } });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
};
const Me = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        res.status(200).json({user})
    }catch (error) {
        res.status(500).json({message: error.message})
        console.log(error)
    }
}



const Logout = async (req, res) => {
    try {
        res.header('auth-token', '').json({message: 'Logged out'})
    }catch (error) {
        res.status(500).json({message: error.message})
        console.log(error)
    }
}
module.exports = {Login, Me, Logout}