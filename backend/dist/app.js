"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const user_route_1 = require("./routes/user.route");
const db_1 = require("./db/db");
const cors_1 = __importDefault(require("cors"));
(0, db_1.connectDB)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/v1', user_route_1.router);
app.listen(process.env.PORT || 5000, () => {
    console.log(`App is listening on port ${process.env.PORT}`);
});
