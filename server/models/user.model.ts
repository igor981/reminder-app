import mongoose from 'mongoose';


const User = new mongoose.Schema({
    userId: { type: String, required: true},
    username: { type: String, required: true},
    fname: { type: String, required: true},
    lname: { type: String, required: true},
    password: { type: String, required: true},
    public: {type: Boolean, default: true},
},
{collection: 'user-data'}
)



const model = mongoose.model('UserData', User);


export default model