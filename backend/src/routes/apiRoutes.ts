import express from "express";
import { fetchEngines } from "../controllers/apiController.ts";

const router = express.Router();

router.get("/engines", fetchEngines);

export default router;

