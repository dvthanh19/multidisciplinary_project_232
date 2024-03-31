const User=require('../models/user.model')
const bcrypt=require('bcrypt')

// const createUser = async (req, res) => {
//     try {
//         const user = await User.findOne({email: req.body.email})
//         if(user){
//             res.status(400).json({message: 'User already exists'})
//         }
//         const hashedPassword = await bcrypt.hash(req.body.password, 10)
//         // create new user with hashed password
//         const newUser = await User.create({
//             email: req.body.email,
//             password: hashedPassword,
//             fullname: req.body.fullname,
//             role: req.body.role,
//             schedule: req.body.schedule,
//             phoneNo: req.body.phoneNo,
//             positionList: req.body.positionList
//         })
//         res.status(201).json({newUser})
//     }catch (error) {
//         res.status(500).json({message: error.message})
//         console.log(error)
//     }
// }

const Login = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user){
            res.status(400).json({message: 'User not found'})
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if(!validPassword){
            res.status(400).json({message: 'Invalid password'})
        }
        res.status(200).json({user})
    }
    catch (error) {
        res.status(500).json({message: error.message})
        console.log(error)
    }
}

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
        res.status(200).json({message: 'Logout success'})
    }catch (error) {
        res.status(500).json({message: error.message})
        console.log(error)
    }
}

module.exports = {Login, Me, Logout}