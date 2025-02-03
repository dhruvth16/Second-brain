import express from 'express'
export const router = express.Router()
import { userSignin, userSignup, logout } from '../controllers/user.controller'
import { addContent, deletContent, getContent } from '../controllers/content.controller'
import { authMiddleware } from "../middleware/auth.middleware";
import { Request } from 'express';

interface CustomRequest extends Request {
  userId?: string;
}

router.get('/', (req, res) => {
    res.send("Hii, there")
})

router.post('/signin', userSignin)
router.post('/signup', userSignup)
router.post('/content', authMiddleware, addContent)
router.get('/content', authMiddleware, getContent)
router.delete('/content-delete', authMiddleware, deletContent)
router.get('/logout', authMiddleware, logout)