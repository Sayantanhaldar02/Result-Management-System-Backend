const { handelRegisterController, handelLoginController, handelGetAllUsers } = require("../controller/user.controller");
const { authenticateTo } = require("../middleware/auth.middleware");

const router = require("express").Router();


router.post('/register',handelRegisterController);
router.post('/login',handelLoginController);
router.get('/all-users',authenticateTo(["admin"]) ,handelGetAllUsers);


module.exports = {
    authRouter: router
}