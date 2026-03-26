import express from "express";
import { getListings, getListing } from "../controllers/ListingController.js";

const router = express.Router();

router.get("/",    getListings);
router.get("/:id", getListing);

export default router;