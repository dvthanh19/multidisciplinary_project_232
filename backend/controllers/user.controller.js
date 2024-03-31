const User = require('../models/user.model')
const bcrypt = require('bcrypt')

const getUser = async (req, res) => {
    try {
        const user = await User.find({})
        res.status(200).json({user})
    }catch (error) {
        res.status(500).json({message: error.message})
        console.log(error)
    }
}
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json({user})
    }catch (error) {
        res.status(500).json({message: error.message})
        console.log(error)
    }
}
// Create user with raw password not hashed yet then hash it before saving to database
const createUser = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if(user){
            res.status(400).json({message: 'User already exists'})
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        // create new user with hashed password
        const newUser = await User.create({
            email: req.body.email,
            password: hashedPassword,
            fullname: req.body.fullname,
            role: req.body.role,
            schedule: req.body.schedule,
            phoneNo: req.body.phoneNo,
            positionList: req.body.positionList
        })
        res.status(201).json({newUser})
    }catch (error) {
        res.status(500).json({message: error.message})
        console.log(error)
    }
}
const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body)
        if(!user){
            res.status(404).json({message: 'User not found'})
        }
        const updateUser = await User.findById(req.params.id);
        res.status(200).json({updateUser})
    }
    catch (error) {
        res.status(500).json({message: error.message})
        console.log(error)
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            res.status(404).json({message: 'User not found'})
        }
        res.status(200).json({message: 'User deleted'})
    }catch (error) {
        res.status(500).json({message: error.message})
        console.log(error)
    }
}

module.exports = {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}