import { UserModel } from '../models/user.model';
import { Request, Response } from 'express';
import { z } from 'zod'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ExpireToken } from '../models/expireToken.model';
import { SignupRequest } from '../interfaces/requestInterface/SignupRequest';
import { SigninRequest } from '../interfaces/requestInterface/SigninRequest';
import { SigninResponse } from '../interfaces/responseInterface/SigninResponse';
import { SignupResponse } from '../interfaces/responseInterface/SignupResponse';

export const userSignup = async (req: SignupRequest, res: SignupResponse) => {
    const requiredBody = z.object({
    email: z.string().min(3).max(100).email(),
    password: z
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
    fullname: z.object({
      firstname: z.string().min(3).max(100),
      lastname: z.string().min(3).max(100),
    }),
  });

  const safeParsedData = requiredBody.safeParse(req.body)
  if (!safeParsedData.success) {
    res.status(401).json({
      message: "Incorrect credentials!",
      error: safeParsedData.error,
    });
    return;
  }

  const { email, password, fullname } = req.body;
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(409).json({
        message: "User already exists",
      });
      return;
    }

    const user = await UserModel.create({
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
  } catch (error) {
    console.log(error);
  }


}

export const userSignin = async (req: SigninRequest, res: SigninResponse) => {
    const requiredBody = z.object({
        email: z.string().min(3).max(100).email(),
        password: z.string().min(8).max(100),
    });

    const safeParsedData = requiredBody.safeParse(req.body)
    if (!safeParsedData.success) {
        res.status(401).json({
            message: "Incorrect credentials!",
            error: safeParsedData.error,
        });
        return;
    }

    const { email, password } = req.body;

    try {
        const existingUser = await UserModel.findOne({ email });
        if (!existingUser) {
            res.status(401).json({
                message: "User does not exist!",
            });
            return;
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            res.status(401).json({
                message: "Incorrect password!",
            });
            return;
        }
        const token = jwt.sign(
            {
                id: existingUser._id,
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "1d",
            }
        )

        res.status(200).json({
            message: "User signed in successfully!",
            token,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error!",
            error: error,
        });
    }
}

export const logout = async (req: Request, res: Response) => {
    res.clearCookie("token");
    const token = req.headers.authorization?.split(" ")[1];
    await ExpireToken.create({ token });
    res.status(200).json({
        message: "User logged out successfully!",
    });
}
