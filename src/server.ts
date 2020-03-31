// const express = require("express");
import userRouter from "./routers/userRouter";
import express, { Application } from "express";
import "./lib/env";

const port: string | undefined = process.env.PORT || process.env.MK_NODE_PORT;
const server: Application = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));

// Middleware

// Routers
server.use("/api/users", userRouter);

server.listen(port, () =>
  console.log(`Server is listening on port ${port}...`)
);
// module.exports = server;
