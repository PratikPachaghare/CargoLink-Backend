import { Router } from "express";
import { login, ressiter } from "../controllers/User/Auth.js";

const router = Router();

router.get("/login", login);

router.get("/ressister", ressiter );

export default router;
