import { Router } from "express";
import { login } from "../controllers/Authcontroller.js";
import { register } from "../controllers/Authcontroller.js";

const router = Router();
router.post("/login", login);
router.post("/register", register);
export default router;
