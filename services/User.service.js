const { UserModel } = require("../models");
const NoRecordFoundError = require("../lib/Errors/no-record-found.error")
const DuplicateRecordFoundError = require("../lib/Errors/duplicate-record-found.error")
class UserService {
    constructor() { }
    /**
     * @param userId {String} -user email 
     */
    get(userId) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await UserModel.findOne({ email: userId, status: 0 }).lean();
                if (!result) return reject(new NoRecordFoundError("user not exist"))
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });

    }
    /**
     * 
     * @param name {String} -- user name
     * @param mobile {String}-- user mobile
     * @param email {String}-- user email
     * @param address {Object}-- user address 
     */
    create({ name, mobile, email, address }) {
        return new Promise(async (resolve, reject) => {
            try {
                let newUser = new UserModel({
                    name, email, mobile, address
                })
                const result = await newUser.save();
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }
    /**
     * @param userId {String}-- user email
     */
    update(userId, data) {
        return new Promise(async (resolve, reject) => {
            try {
                const record = await UserModel.findOneAndUpdate(
                    { email: userId, status: 0 },
                    { ...data, updatedAt: new Date(Date.now()) },
                    { new: true })
                if (!record) return reject(new NoRecordFoundError("User not exist"))
                resolve(record)
            } catch (error) {
                reject(error);
            }
        });
    }
    /**
    * @param userId {String}-- user email
    */
    delete(userId) {
        return new Promise(async (resolve, reject) => {
            try {
                const record = await UserModel.findOneAndUpdate(
                    { email: userId, status: 0 },
                    { status: 1, updatedAt: new Date(Date.now()) },
                    { new: true })
                if (!record) return reject(new NoRecordFoundError("User not exist"))
                resolve(record)
            } catch (error) {
                reject(error);
            }
        });
    }
    getUsers() {
        return new Promise(async (resolve, reject) => {
            try {
                const record = await UserModel.find({ status: 0 });
                resolve(record);
            } catch (error) {
                reject(error);
            }
        });
    }
    getUsersSortedByTimestamp() {
        return new Promise(async (resolve, reject) => {
            try {
                const record = await UserModel.find({ status: 0 })
                    .sort({ createdAt: -1 })
                    .limit(7);
                resolve(record);
            } catch (error) {
                reject(error);
            }
        });
    }
    distance(x1, y1, x2, y2) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2))
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }
    getUsersByDistance(latitude, longitude) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = [];
                let x1 = latitude, y1 = longitude;
                const record = await UserModel.find({ status: 0 }).lean();

                await Promise.all([record])

                record.map(async (user) => {
                    const coordinates = user.address.coordinates;

                    let x2 = coordinates[0], y2 = coordinates[1]
                    let dist = await this.distance(x1, y1, x2, y2)
                    user["dist"] = dist;
                    result.push(user);
                })
                resolve(result)
            } catch (error) {
                reject(error);
            }
        });
    }

}
module.exports = UserService