"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    username: { type: String, required: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    password: { type: String, required: true },
    public: { type: Boolean, default: true },
}, { collection: 'user-data' });
User.pre('save', function (next) {
    const user = this;
    bcrypt_1.default.hash(user.password, 10, (error, hash) => {
        if (error) {
            return next(error);
        }
        user.password = hash;
        user.confirmPassword = hash;
        next();
    });
});
const model = mongoose_1.default.model('UserData', User);
exports.default = model;
