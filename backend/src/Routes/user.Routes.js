import express from "express";
import { Register } from "../Controller/userController.js";

const userRouter = express.Router();

userRouter.post("/register",Register )

export default userRouter;