import { Request } from "express";

export interface SignupRequest extends Request {
    body: {
        password: string;
        email: string;
        fullname: {
            firstname: string;
            lastname: string;
        }
    };
}