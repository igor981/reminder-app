"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Task = new mongoose_1.default.Schema({
    taskId: { type: String, required: true },
    creatorId: { type: String, required: true },
    category: { type: String, required: true },
    task: { type: String, required: true },
    description: { type: String, required: true },
    nutrients: { type: {}, required: false },
    checked: { type: Boolean, default: false },
    locked: { type: Boolean, default: false },
    public: { type: Boolean, default: true },
    deadline: { type: Date, required: false },
    cost: { type: Number, default: 0 },
}, { collection: 'task-data' });
const model = mongoose_1.default.model('TaskData', Task);
exports.default = model;
