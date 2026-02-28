import express from "express";
import { fetchMakes } from "../controllers/carController.ts";

const router = express.Router();

router.get("/makes/:year", fetchMakes);

export default router;