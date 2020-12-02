const router = require("express").Router();
const UserController = require("../controllers/User.controller");

const userController = new UserController();

/**
 * @desc get all users
 * @route http://localhost:3000/user/users
 */
router.get('/users', userController.getAllUsers)
/**
 * @desc get user by email
 * @route http://localhost:3000/user/:userId
 */
router.get('/:userId/info', userController.getUser);
/**
 * @desc register user
 * @route http://localhost:3000/user/register
 */
router.post('/register', userController.createUser);
/**
 * @desc update user 
 * @route http://localhost:3000/user/:userId
 */
router.patch('/update/:userId', userController.updateUser);
/**
 * @desc delete user 
 * @route http://localhost:3000/user/:userId
 */
router.delete('/:userId', userController.deleteUser);
/**
 * @desc Get all Users sorted by their distance from coordinates passed in the query param of the Endpoint. 
 * @route http://localhost:3000/user/distance?latitude=17.3850&longitude=78.4867
 */
router.get("/distance", userController.getAllUsersByDistance);

module.exports = router;