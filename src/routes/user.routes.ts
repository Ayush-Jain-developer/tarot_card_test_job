import express from 'express'
import { UserController } from '@controller'

export const userRoute = express.Router()

userRoute.post('/signUp', UserController.signUp)