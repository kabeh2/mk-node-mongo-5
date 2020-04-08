"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.Router();
router.post("/", controllers_1.addUser);
router.post("/login", controllers_1.loginUser);
router.post("/logout", auth_1.default, controllers_1.logoutUser);
router.post("/logoutAll", auth_1.default, controllers_1.logoutAll);
router.get("/me", auth_1.default, controllers_1.readUser);
router.patch("/me", auth_1.default, controllers_1.updateUser);
router.delete("/me", auth_1.default, controllers_1.deleteUser);
exports.default = router;
