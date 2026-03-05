import express from "express";
import { register } from "../controllers/userController.ts";

const router = express.Router();

// This will be: POST http://localhost:5000/api/users/register
router.post("/register", register);

export default router;
