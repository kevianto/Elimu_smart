import express from "express";
import { createProfileAndGeneratePlan, getProfile} from "../controllers/Profilecontroller.js";
import { protect } from "../middlewares/Auth.js";

const router = express.Router();

router.post("/",protect ,createProfileAndGeneratePlan);
router.get("/userId", getProfile);

export default router;