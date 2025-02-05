import { Response } from "express";
import { CustomRequest } from "../interfaces/requestInterface/CustomRequest";
import { LinkModel } from "../models/link.model";
import { v4 as uuidv4 } from 'uuid';
import mongoose from "mongoose";
import { ContentModel } from "../models/content.model";

export const createBrainLink = async (req: CustomRequest, res: Response) => {
    const share = req.body.share;
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        if (share) {
            const hash = uuidv4();
            const existingLink = await LinkModel.findOne({ userId: req.userId });
            if (existingLink) {
                await session.abortTransaction();
                session.endSession();
                res.status(409).json({ message: "Link already exists" });
                return;
            }

            
            await LinkModel.create({
                hash,
                userId: req.userId
            })
            await session.commitTransaction();
            session.endSession();

            res.status(201).json({ 
                message: `share/${hash}`
             });
        } else {
            await LinkModel.deleteOne({ userId: req.userId });
            await session.commitTransaction();
            session.endSession();
            res.status(200).json({ message: "Link deleted" });
            return;
        }

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ message: "Internal server error" });
        return;
    }
}

export const getBrainLink = async (req: CustomRequest, res: Response) => {
    const hash = req.params.brainlink;
    try {
        const link = await LinkModel.findOne({ hash }).populate("userId").exec();
        // console.log(link)
        if (!link) {
            res.status(404).json({ message: "Link not found" });
            return;
        }

        const content = await ContentModel.find({ userId: link.userId });
        if (!content) {
            res.status(404).json({ message: "Content not found" });
            return;
        }

        res.status(200).json({ content });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        return;
    }
}