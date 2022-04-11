"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reminder_controller_1 = require("../controllers/reminder.controller");
const router = (0, express_1.Router)();
router.post('/create-reminder', reminder_controller_1.createReminder);
exports.default = router;
