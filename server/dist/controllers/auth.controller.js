"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logIn = exports.signUp = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.find({
            username: req.body.username,
        });
        if (user.length > 0) {
            res.send({ error: 'Username taken' });
            return;
        }
        const newUser = yield user_model_1.default.create({
            userId: req.body.id,
            username: req.body.username,
            fname: req.body.fname,
            lname: req.body.lname,
            password: req.body.password,
        });
        return res.send({ user: newUser });
    }
    catch (error) {
        return res.send({ error: error.message });
    }
});
exports.signUp = signUp;
const logIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({
            username: req.body.username,
        });
        if (user) {
            const token = jsonwebtoken_1.default.sign(JSON.stringify(user), '1adsa2-asdc4-12');
            res.send({ user: token });
        }
        else {
            res.send({ error: 'The account cannot be found' });
        }
        return;
    }
    catch (error) {
        res.send({ error: error.message });
    }
});
exports.logIn = logIn;
