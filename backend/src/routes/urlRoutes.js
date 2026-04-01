import express from "express";
import { createShortUrl } from "../controllers/urlControllers.js";

const router = express.Router();

router.post("/shorten", createShortUrl);

export default router;
