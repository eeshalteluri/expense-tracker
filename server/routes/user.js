import express from 'express'
import verifyToken from '../middlewares/auth'
import { getUser } from '../controllers/user'


const router = express.Router()

router.get("/:id", verifyToken, getUser)