require("dotenv").config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserService {

    constructor(userModel) {
        this.userModel = userModel;
    }


    async Register(userData) {
        const {
            email,
            password,
            role
        } = userData;
        const user = await this.userModel.findOne({
            email: email
        });

        if (user) {
            throw new Error('User already exists');
        };

        const hashedPassword = await bcrypt.hash(password,10);
        // console.log(hashedPassword);
        const newUser = new this.userModel({
            email,
            password: hashedPassword,
            role
        });
        await newUser.save();

        return {
            user: newUser,
            message: "User registered successfully!"
        };
    }



    async Login(userData) {
        const {
            email,
            password
        } = userData;
        const user = await this.userModel.findOne({
            email: email
        });
        if (!user) {
            throw new Error('User not found');
        };
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid password');
        };
        const token = jwt.sign({
            id: user._id,
            email: user.email,
            role: user.role
        }, process.env.JWT_SECRET);

        return {
            token,
            message: "user login successfully!"
        };
    }


    async getAlluser(){
        const users = await this.userModel.find({});
        return {
            users,
            message: `${users.length} users fetched successfully!`
        };
    }

}

module.exports = UserService;