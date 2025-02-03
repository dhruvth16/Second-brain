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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletContent = exports.getContent = exports.addContent = void 0;
const content_model_1 = require("../models/content.model");
const zod_1 = require("zod");
const addContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const requiredBody = zod_1.z.object({
        link: zod_1.z.string().min(3).max(100),
        title: zod_1.z.string().min(3).max(100),
        type: zod_1.z.string().min(3).max(100),
    });
    const safeParsedData = requiredBody.safeParse(req.body);
    if (!safeParsedData.success) {
        res.status(401).json({
            message: "Incorrect credentials!",
            error: safeParsedData.error,
        });
    }
    const { link, title, type } = req.body;
    try {
        const content = yield content_model_1.ContentModel.create({
            link,
            title,
            type,
            userId
        });
        res.status(201).json({
            message: "Content added successfully",
            content
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.addContent = addContent;
const getContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        const content = yield content_model_1.ContentModel.find({ userId }).populate("userId", "email");
        res.status(200).json({ content });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getContent = getContent;
const deletContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    try {
        const deletedContent = yield content_model_1.ContentModel.findByIdAndDelete(contentId);
        if (!deletedContent) {
            res.status(404).json({ message: "Content not found" });
            return;
        }
        res.status(200).json({ message: "Content deleted successfully", deletedContent });
    }
    catch (error) {
        console.log(error);
    }
});
exports.deletContent = deletContent;
