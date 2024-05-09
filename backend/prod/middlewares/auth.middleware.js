"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    if (token == null) {
        res.status(401).json({ error: `Unauthorized access: No token` });
        return;
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            return res.status(403).json({ error: `Unauthorized access: Invalid token` });
        }
        if (typeof decoded === 'object' && decoded !== null && 'id' in decoded && 'username' in decoded && 'role' in decoded) {
            req.user = {
                id: decoded.id,
                username: decoded.username,
                role: decoded.role
            };
        }
        else {
            res.status(403).json({ error: 'Invalid token structure' });
        }
        next();
    });
}
exports.authenticateToken = authenticateToken;
function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
        if (req.user && allowedRoles.includes(req.user.role)) {
            next();
        }
        else {
            res.status(403).send('Access denied. You do not have permission to access this resource.');
        }
    };
}
exports.authorizeRoles = authorizeRoles;
