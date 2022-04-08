import mongoose from 'mongoose';


const Task = new mongoose.Schema({
    taskId: {type: String, required: true},
    creatorId: {type: String, required: true},
    category: { type: String, required: true},
    task: { type: String, required: true},
    description: { type: String, required: true},
    nutrients: { type: {}, required: false},
    checked: {type: Boolean, default: false},
    locked: {type: Boolean, default: false},
    public: {type: Boolean, default: true},
    deadline: {type: Date, required: false},
    cost: {type: Number, default: 0},
},
{collection: 'task-data'}
)



const model = mongoose.model('TaskData', Task);


export default model