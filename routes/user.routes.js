const UserController = require('../controllers/user.controller');

const routes = (app) => {
    app.post('/pma/v1/users', UserController.createUser);
    app.post('/pma/v1/users/login', UserController.loginUser);
    //app.get('/pma/v1/users/getall', UserController.getAllUsers);
    //app.get('/pma/v1/users/:id', UserController.getUserById);
}

module.exports = routes;