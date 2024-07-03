import express from "express";
import { Register, Login } from "../controller/auth.js";
import Validate from "../middleware/validate.js";
import { check } from "express-validator";


const router = express.Router();

// Register route -- POST request
router.post(
    "/register",
    check("username")
        .not()
        .isEmpty()
        .withMessage("Your username is required")
        .trim()
        .escape(),
    check("email")
        .isEmail()
        .withMessage("Enter a valid email address")
        .normalizeEmail(),
    check("password")
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage("Must be at least 8 chars long"),
    Validate,
    Register
);

// Login route
router.post(
    "/login",
    check("email")
        .isEmail()
        .withMessage("Enter a valid email address")
        .normalizeEmail(),
    check("password").not().isEmpty().withMessage('Password is required!'),
    Validate,
    Login
);

export default router;