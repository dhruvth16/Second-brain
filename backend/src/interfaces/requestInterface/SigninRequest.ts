import { Request } from "express";

export interface SigninRequest extends Request {
    body: {
        password: string;
        email: string;
    };
}