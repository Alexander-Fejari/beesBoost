"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uploadDir = path_1.default.join(__dirname, '../../uploads/uploaded_pp');
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const fileFilter = (req, file, cb) => {
    const allowedTypes = [`image/jpeg`, `image/png`, `image/gif`];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error(`Invalid file type. Only JPEG, PNG and GIF files are allowed.`), false);
    }
};
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 4
    },
    fileFilter: fileFilter
});
const uploadMiddleware = (req, res, next) => {
    const uploadSingle = upload.single(`profile_pic`);
    uploadSingle(req, res, (err) => {
        if (err instanceof multer_1.default.MulterError) {
            if (err.code === `LIMIT_FILE_SIZE`) {
                return res.status(400).json({ error: `File size is too large. Maximum size is 4MB.` });
            }
            return res.status(400).json({ error: err.message });
        }
        else if (err) {
            return res.status(500).json({ error: err.message });
        }
        next();
    });
};
exports.default = uploadMiddleware;
