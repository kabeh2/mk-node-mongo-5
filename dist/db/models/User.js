"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true,
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
        },
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.includes("password")) {
                throw new Error("Password can not contain the word 'password'.");
            }
        },
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
});
// Hide Password and Tokens
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
};
// Find login credentials
userSchema.statics.findByCredentials = async (password, username, email) => {
    const user = await User.findOne(email !== undefined ? { email } : { username });
    if (!user) {
        throw new Error("Unable to login.");
    }
    const isMatch = await bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Unable to login.");
    }
    return user;
};
// Hash password
userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt_1.default.hash(user.password, 8);
    }
    next();
});
// Generate Token
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jsonwebtoken_1.default.sign({ _id: user._id.toString() }, `${process.env.MK_NODE_MONGO_SECRET}`);
    user.tokens = [...user.tokens, { token }];
    await user.save();
    return token;
};
const User = mongoose_1.model("User", userSchema);
exports.default = User;
