import { ContentModel } from "../models/content.model";
import { Request, Response } from 'express';
import { z } from 'zod'
import { CustomRequest } from "../interfaces/requestInterface/CustomRequest";



export const addContent = async (req: CustomRequest, res: Response): Promise<void> => {
    const userId = req.userId;
    const requiredBody = z.object({
        link: z.string().min(3).max(100),
        title: z.string().min(3).max(100),
        type: z.string().min(3).max(100),
    })

    const safeParsedData = requiredBody.safeParse(req.body)
    if (!safeParsedData.success) {
        res.status(401).json({
            message: "Incorrect credentials!",
            error: safeParsedData.error,
        });
    }

    const { link , title, type, content, createdAt } = req.body;
    try {
        const contentData = await ContentModel.create({
            link,
            title,
            type,
            content,
            createdAt,
            userId
        })

        res.status(201).json({
            message: "Content added successfully",
            contentData
        })
    } catch (error) {
        console.log(error)
    }
}

export const getContent = async (req: CustomRequest, res: Response): Promise<void> => {
    const userId = req.userId;
    try {
        const content = await ContentModel.find({ userId }).populate("userId", "email")
        res.status(200).json({ content });
    } catch (error) {
        console.log(error)
    }
}

export const deletContent = async (req: CustomRequest, res: Response): Promise<void> => {
    const contentId = req.body.contentId;
    try {
        const deletedContent = await ContentModel.findByIdAndDelete(contentId)

        if (!deletedContent) {
            res.status(404).json({ message: "Content not found" });
            return
        }

        res.status(200).json({ message: "Content deleted successfully", deletedContent });
    } catch (error) {
        console.log(error)
    }
}