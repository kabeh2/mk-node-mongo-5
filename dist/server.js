"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("./db/mongoose"));
const helmet_1 = __importDefault(require("helmet"));
const userRouter_1 = __importDefault(require("./routers/userRouter"));
const express_1 = __importDefault(require("express"));
require("./lib/env");
const port = process.env.PORT || process.env.MK_NODE_PORT;
const server = express_1.default();
mongoose_1.default();
server.use(express_1.default.json());
server.use(express_1.default.urlencoded({ extended: true }));
server.use(express_1.default.static("public"));
server.use(helmet_1.default());
// Middleware
// Routers
server.use("/api/users", userRouter_1.default);
server.listen(port, () => console.log(`Server is listening on port ${port}...`));
