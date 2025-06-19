import express from "express";
import { getPlansByUserId } from "../controllers/Plancontroller.js";

const router = express.Router();

router.get("/:userId", getPlansByUserId);

export default router;

