const UserService = require("../services/User.service");

const userService = new UserService();

const sortBYDistance = (array) => {
    array.sort((a, b) => {
        return a.dist - b.dist;
    });
}

class UserController {
    constructor() { }
    async getUser(req, res, next) {
        try {
            const userId = req.params.userId;
            const result = await userService.get(userId)

            res.status(201).json({ status: true, data: result })
        } catch (error) {
            next(error);
        }
    }


    async createUser(req, res, next) {
        try {
            const { name, email, mobile, address } = req.body;
            const result = await userService.create({ name, email, mobile, address })

            res.status(201).json({ status: true, data: result })
        } catch (error) {
            next(error)
        }
    }
    async updateUser(req, res, next) {
        try {
            const userId = req.params.userId;
            const result = await userService.update(userId, req.body)

            res.status(200).json({ status: true, data: result })

        } catch (error) {
            next(error);
        }

    }
    async deleteUser(req, res, next) {
        try {
            const userId = req.params.userId;
            const result = await userService.delete(userId)

            res.status(200).json({ status: true, data: result })
        } catch (error) {
            next(error)
        }
    }
    async getAllUsers(req, res, next) {
        try {
            const records = await userService.getUsers();
            res.status(201).json({ status: true, data: records })
        } catch (error) {
            next(error);
        }
    }
    async getAllUsersByDistance(req, res, next) {
        try {
            const { latitude, longitude } = req.query;
            const record = await userService.getUsersByDistance(latitude, longitude)

            // sorting in ascending order by distance
            sortBYDistance(record)

            res.status(200).json({ status: true, data: record })

        } catch (error) {
            next(error)
        }
    }
}
module.exports = UserController;