import express from "express";
import {
  fetchMakes,
  fetchModels,
  fetchEngines,
  fetchBodies,
  fetchMileages,
} from "../controllers/apiController.js";

const router = express.Router();


router.get("/makes/:year", fetchMakes);

router.get("/models/:year/:make", fetchModels);

router.get("/engines", fetchEngines);

router.get("/bodies", fetchBodies);

router.get("/mileages", fetchMileages);

export default router;