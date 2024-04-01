const Users = require('../models/UsersModel');


class UserController {

    foo = async (req, res, next) => {}

    // [POST]
    create = async (req, res, next) => {
        const { username, password, confPassword, fullname, email, phone_num} = req.body;
        const user = await Users.findOne({
            where: {
                username: username,
            }
        });
        if (user) return res.status(404).json({ msg: "User has already exist!!" });
        
        
        if (password !== confPassword)
            return res
                .status(400)
                .json({ msg: "Password differ from Confirm Password " });
            
        const hashedPassword = await argon2.hash(password);
        try {
            await Users.create({
                username,
                password: hashedPassword,
                fullname,
                email,
                phone_num,
                role: 'observer',
            });
            res.status(201).json({ msg: "Register successfully!" });
        }
        catch(err) {
            res.status(400).json({ msg: err.message });
        }
    }

    
    getUserById = async (req, res, next) => {
        try {
            const user = await Users.findOne(
                {
                    where: {
                        user_id: req.query.user_id
                    }
                }
            )
            if (!user) res.status(404).json({ msg: 'User not found' });

            
            res.status(200).json(user);
        }
        catch(err) {
            res.status(500).json({ msg: err.message });
        }
    }

    getUserByRole = async (req, res, next) => {
        try {
            const users = await Users.findAll(
                {
                    where: {
                        role: req.query.role
                    }
                }
            )
            if (!users) res.status(404).json({ msg: 'User not found' });

            
            res.status(200).json(users);
        }
        catch(err) {
            res.status(500).json({ msg: err.message });
        }
    }

    update = async (req, res, next) => {
        try {
            const { username, new_password, new_fullname, new_email, new_phone_num } = req.body;
            const updatedUser = Users.update({
                password: new_password,
                fullname: new_fullname,
                email: new_email,
                phone_numb: new_phone_num
            }, {
                where: {
                    username: username,
                },
            });
            res.status(200).json({ msg: "Product updated successfully" });
        }
        catch(err) {
            res.status(500).json({ msg: err.message });
        }
    }

    updateRole = async(req, res, next) => {
        const { username, role } = req.body;
        const user = await Users.findOne({
            where: {
                username: username,
            }
        });

        if (!user) return res.status(404).json({ msg: "User not found!!" });


        try {
            await Users.update({
                role: role
            }, {
                where: {
                    username: username,
                },
            });
            res.status(200).json({ msg: "Role updated successfully" });
        }
        catch(err) {
            res.status(400).json({ msg: err.message });
        }
    }

    delete = async (req, res, next) => {
        try {
            const user = await Users.findOne({
                where: {
                    user_id: req.body.user_id
                }
            })
            if (!user) return res.status(404).json({ msg: "User not exist" });
            

            if (req.role === "admin") {
                await Devices.destroy({
                    where: {
                        user_id: req.body.user_id
                    }
                });
            } else return res.status(403).json({ msg: "Access denied" });

            res.status(200).json({ msg: "User deleted successfully" });
    
        }
        catch(err) {
            res.status(500).json({ msg: err.message });
        }
    }
        
}

module.exports = new UserController();
