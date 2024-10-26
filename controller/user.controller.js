const UserModel = require('../models/userModel.model');
const UserService = require('../services/userService.service');
const userService = new UserService(UserModel)


async function handelRegisterController(req, res) {
    try {
        const {user,message} = await userService.Register(req.body);
        return res.status(201).json({user,message});
    } catch (error) {
        return res.status(400).json({
            message:"registration failed.",
            error: error.message
        });
    }
};


async function handelLoginController(req, res) {
    try {
       const {token, message} = await userService.Login(req.body)
       return res.status(201).json({message,token});
    } catch (error) {
        return res.status(400).json({
            message:"login failed.",
            error: error.message
        });
    }
};


async function handelGetAllUsers(req,res) {
    try {
        const {users,message} = await userService.getAlluser()
        return res.status(201).json({users,message});
    } catch (error) {
        return res.status(400).json({
            message:"failed to fetch user.",
            error: error.message
        });
    }
}


module.exports = {
    handelRegisterController,
    handelLoginController,
    handelGetAllUsers
}