const User = require('../models/users.model');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

class UserController {

    // Returns all users
    getAllUsers = (req, res) => {
        User.find()
            .then(allUsers => {
                res.json({ results: allUsers })
            })
            .catch(err => {
                res.json({ error: err })
            })
    }

    // Creates new user
    registerUser = (req, res) => {
        User.create(req.body)
            .then(user => {
                const userToken = jwt.sign({
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                }, process.env.SECRET_KEY);

                res
                    .cookie("usertoken", userToken, process.env.SECRET_KEY, {
                        httpOnly: true
                    })
                    .json({ msg: "success!", user: user });
            })
            .catch(err => res.json(err));
    }

    // Logs in user
    loginUser = async (req, res) => {
        const user = await User.findOne({ email: req.body.email }); // Checks if user is in DB
        if (user === null) {
            return res.json({errors: "Invalid Email or Password"});
        }
        const correctPassword = await bcrypt.compare(req.body.password, user.password); // Compares supplied password and hashpassword in DB
        if (!correctPassword) {
            return res.json({errors: "Invalid Email or Password"});
        }
        const userToken = jwt.sign({
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }, process.env.SECRET_KEY);
        res
            .cookie("usertoken", userToken, process.env.SECRET_KEY, {
                httpOnly: true
            })
            .json({ msg: "success!" });
    }

    // Logs out user
    logoutUser = (req, res) => {
        res.clearCookie('usertoken');
        res.sendStatus(200);
    }

    // Deletes one user
    deleteUser = (req, res) => {
        User.deleteOne({ _id: req.params._id })
        .then(confirmDelete => res.json(confirmDelete))
        .catch(err => res.json(err))
    }

    // Gets info from logged in user
    loggedInUser= (req, res) => { // Uses info stored in cookie to get the ID of logged in user from DB and returns info about that user
        const decodedJWT = jwt.decode(req.cookies.usertoken, {complete:true})
        User.findOne({_id: decodedJWT.payload.id})
            .then(foundUser => {
                res.json({results: {firstName: foundUser.firstName, lastName: foundUser.lastName, email: foundUser.email}})
            })
            .catch(err => {
                res.json(err)
            })
    }




}

module.exports = new UserController();