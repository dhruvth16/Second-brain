"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router();
const user_controller_1 = require("../controllers/user.controller");
const content_controller_1 = require("../controllers/content.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
exports.router.get('/', (req, res) => {
    res.send("Hii, there");
});
exports.router.post('/signin', user_controller_1.userSignin);
exports.router.post('/signup', user_controller_1.userSignup);
exports.router.post('/content', auth_middleware_1.authMiddleware, content_controller_1.addContent);
exports.router.get('/content', auth_middleware_1.authMiddleware, content_controller_1.getContent);
exports.router.delete('/content-delete', auth_middleware_1.authMiddleware, content_controller_1.deletContent);
