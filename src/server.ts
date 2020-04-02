import connect from "./db/mongoose";
import helmet from "helmet";
import userRouter from "./routers/userRouter";
import express, { Application } from "express";
import "./lib/env";

const port: string | undefined = process.env.PORT || process.env.MK_NODE_PORT;
const server: Application = express();

connect();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(helmet());
// Middleware

// Routers
server.use("/api/users", userRouter);

server.listen(port, () =>
  console.log(`Server is listening on port ${port}...`)
);
