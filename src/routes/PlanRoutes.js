import express from "express";
import { generatePlan } from "../controllers/Plancontroller.js";

const router = express.Router();

router.post("/generate", generatePlan);

export default router;
