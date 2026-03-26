import express from "express";
import { fetchMakes, fetchModels } from "../controllers/carController.js";

const router = express.Router();

router.get("/makes/:year",        fetchMakes);
router.get("/models/:year/:make", fetchModels);

export default router;