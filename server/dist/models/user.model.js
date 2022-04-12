import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const User = new mongoose.Schema({
    userId: { type: String, required: true },
    username: { type: String, required: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    password: { type: String, required: true },
    public: { type: Boolean, default: true },
}, { collection: 'user-data' });
User.pre('save', function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, (error, hash) => {
        if (error) {
            return next(error);
        }
        user.password = hash;
        user.confirmPassword = hash;
        next();
    });
});
const model = mongoose.model('UserData', User);
export default model;
