"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSignin = exports.userSignup = void 0;
const user_model_1 = require("../models/user.model");
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requiredBody = zod_1.z.object({
        email: zod_1.z.string().min(3).max(100).email(),
        password: zod_1.z
            .string()
            .min(8)
            .max(100)
            .refine((password) => /[A-Z]/.test(password), {
            message: "uppercaseErrorMessage",
        })
            .refine((password) => /[a-z]/.test(password), {
            message: "lowercaseErrorMessage",
        })
            .refine((password) => /[0-9]/.test(password), {
            message: "numberErrorMessage",
        })
            .refine((password) => /[!@#$%^&*]/.test(password), {
            message: "specialCharacterErrorMessage",
        }),
        fullname: zod_1.z.object({
            firstname: zod_1.z.string().min(3).max(100),
            lastname: zod_1.z.string().min(3).max(100),
        }),
    });
    const safeParsedData = requiredBody.safeParse(req.body);
    if (!safeParsedData.success) {
        res.status(401).json({
            message: "Incorrect credentials!",
            error: safeParsedData.error,
        });
        return;
    }
    const { email, password, fullname } = req.body;
    const salt = yield bcrypt_1.default.genSalt(10);
    const hashedPassword = yield bcrypt_1.default.hash(password, salt);
    try {
        const existingUser = yield user_model_1.UserModel.findOne({ email });
        if (existingUser) {
            res.status(409).json({
                message: "User already exists",
            });
            return;
        }
        const user = yield user_model_1.UserModel.create({
            email,
            password: hashedPassword,
            fullname: {
                firstname: fullname.firstname,
                lastname: fullname.lastname,
            },
        });
        if (user) {
            res.status(201).json({ user });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.userSignup = userSignup;
const userSignin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requiredBody = zod_1.z.object({
        email: zod_1.z.string().min(3).max(100).email(),
        password: zod_1.z.string().min(8).max(100),
    });
    const safeParsedData = requiredBody.safeParse(req.body);
    if (!safeParsedData.success) {
        res.status(401).json({
            message: "Incorrect credentials!",
            error: safeParsedData.error,
        });
        return;
    }
    const { email, password } = req.body;
    try {
        const existingUser = yield user_model_1.UserModel.findOne({ email });
        if (!existingUser) {
            res.status(401).json({
                message: "User does not exist!",
            });
            return;
        }
        const isPasswordCorrect = yield bcrypt_1.default.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            res.status(401).json({
                message: "Incorrect password!",
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({
            id: existingUser._id,
        }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        res.status(200).json({
            message: "User signed in successfully!",
            token,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error!",
            error: error,
        });
    }
});
exports.userSignin = userSignin;
