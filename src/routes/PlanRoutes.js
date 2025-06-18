import express from "express";
import {  getPlans } from "../controllers/Plancontroller.js";


const router = express.Router();

// router.post("/generate", generatePlan);
router.get("/:userId",getPlans);
  

export default router;
