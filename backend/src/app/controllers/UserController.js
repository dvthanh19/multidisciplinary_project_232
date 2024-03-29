const Users = require('../models/UsersModel');


class UserController {
    // [GET]
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
                username: username,
                password: hashedPassword,
                fullname: fullname,
                email: email,
                role: 'observer'
            });
            res.status(201).json({ msg: "Register successfully" });
        }
        catch(err) {
            res.status(400).json({ msg: err.message });
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

    getUser = async (req, res, next) => {
        try {
            const user = await Users.findOne(
                {
                    where: {
                        user_id: req.params.userID
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

    getUserById = async (req, res, next) => {
        try {
            const response = await Users.findOne({
                where: {
                    user_id: req.params.userID
                }
            });
            res.status(200).json(response);
        }
        catch(err) {
            res.status(500).json({ msg: err.message });
        }
    }


    // not yet
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

    delete = async (req, res, next) => {

    }
        
}

module.exports = new UserController();
