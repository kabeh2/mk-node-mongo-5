"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator_1.default.isEmail(value)) {
                throw new Error("Not a valid email");
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.includes("password")) {
                throw new Error("Password can not contain the word 'password'.");
            }
        }
    }
});
const User = mongoose_1.model("User", userSchema);
exports.default = User;
