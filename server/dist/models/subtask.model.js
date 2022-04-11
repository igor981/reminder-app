"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const SubTask = new mongoose_1.default.Schema({
    subTaskId: { type: String, required: true },
    parentId: { type: String, required: true },
    category: { type: String, required: true },
    task: { type: String, required: true },
    description: { type: String, required: true },
    nutrients: { type: Object, required: false },
    checked: { type: Boolean, default: false },
    deadline: { type: Date, required: false },
    cost: { type: Number, default: 0 },
}, { collection: 'subtask-data' });
const model = mongoose_1.default.model('SubTaskData', SubTask);
exports.default = model;
