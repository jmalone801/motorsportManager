const UsersController = require('../controllers/users.controller');

module.exports = function (app) {
    // Returns all users
    app.get("/api/all/users", UsersController.getAllUsers)
    // Registers new user
    app.post("/api/register/user", UsersController.registerUser)
    // Logs in user
    app.post("/api/login/user", UsersController.loginUser)
    // Deletes one user
    app.delete("/api/user/delete/:_id", UsersController.deleteUser)
    // Gets info about logged in user from JWT/Cookie
    app.get("/api/user/loggedInUser", UsersController.loggedInUser)
    // Logs out user
    app.get("/api/user/logout", UsersController.logoutUser)
}
