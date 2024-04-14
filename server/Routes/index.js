import express from "express";
import authRoute from "./authRoute.js";
import userRoute from './userRoute.js';
const router = express.Router();

router.use(`/users`, userRoute); //user/verify

export default router;