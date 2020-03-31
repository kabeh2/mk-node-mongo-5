"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../db/models/User"));
const router = express_1.Router();
router.post("/", async (req, res) => {
    const user = new User_1.default(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    }
    catch (error) {
        res.status(400).send({ error });
    }
});
router.get("/", async (req, res) => {
    try {
        const users = await User_1.default.find({});
        if (!users) {
            res.status(400).send({ error: "No users found." });
        }
        res.status(200).send(users);
    }
    catch (error) {
        res.status(500).send({ error });
    }
});
exports.default = router;
