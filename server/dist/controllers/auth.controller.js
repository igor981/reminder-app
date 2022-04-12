var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
export const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.find({
            username: req.body.username,
        });
        if (user.length > 0) {
            res.send({ error: 'Username taken' });
            return;
        }
        const newUser = yield User.create({
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
export const logIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findOne({
            username: req.body.username,
        });
        if (user) {
            const token = jwt.sign(JSON.stringify(user), '1adsa2-asdc4-12');
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
