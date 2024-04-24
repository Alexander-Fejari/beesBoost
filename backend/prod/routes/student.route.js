"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const student_controller_1 = __importDefault(require("../controllers/student.controller"));
const router = express_1.default.Router();
router.post('/', student_controller_1.default.addStudentProfile);
router.get('/', student_controller_1.default.getStudentProfiles);
exports.default = router;
