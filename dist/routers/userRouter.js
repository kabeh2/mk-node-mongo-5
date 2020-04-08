"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../controllers/index");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.Router();
router.post("/", index_1.addUser);
router.post("/login", index_1.loginUser);
router.get("/me", auth_1.default, index_1.readUser);
exports.default = router;
