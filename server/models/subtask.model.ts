import mongoose from 'mongoose';


const SubTask = new mongoose.Schema({
    subTaskId: {type: String, required: true},
    parentId: {type: String, required: true},
    category: { type: String, required: true},
    task: { type: String, required: true},
    description: { type: String, required: true},
    nutrients: { type: Object, required: false},
    checked: {type: Boolean, default: false},
    deadline: {type: Date, required: false},
    cost: {type: Number, default: 0},
},
{collection: 'subtask-data'}
)



const model = mongoose.model('SubTaskData', SubTask);


export default model