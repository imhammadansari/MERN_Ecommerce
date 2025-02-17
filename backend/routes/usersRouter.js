import express from "express";
const router = express.Router();
import { registeredUser, loginUser, checkLogin, logout } from "../controllers/authController.js";


router.get("/", function (req, res) {
    res.send("Hey, Its working");
})

router.post("/register", registeredUser)

router.post("/login", loginUser);

router.get("/check-login", checkLogin);

router.get("/logout", logout);


export default router;