import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import cors from "cors";
import { join } from "node:path";
import { Server } from "socket.io";
import http from "node:http";
import fs from "node:fs";

import { router } from "./routes";
import { Client, LocalAuth } from "whatsapp-web.js";
import { CHATTING_STATUS } from "@config/chatting";

const expressApp = express();
const httpServer = http.createServer(expressApp);
export const socketServer = new Server(httpServer);

export const whatsappClient = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ["--no-sandbox"],
    executablePath: process.env.CHROME_EXECUTABLE_PATH,
  },
});

expressApp.use(express.json());

expressApp.use(
  cors({
    origin: process.env.APP_URL,
  })
);

expressApp.use(express.static(join(__dirname, "..", "..", "..", "uploads")));

socketServer.on("connection", (_socket) => {
  console.log("Socket connected");
});

whatsappClient.on("qr", (qr) => {
  console.log("Waiting for authentication with QRCode...");
  console.log({ qr });
  fs.writeFileSync(`./src/infra/http/qrcode/qr.txt`, qr);
});

whatsappClient.on("authenticated", () => {
  console.log("Authentication successful!");
  socketServer.emit("chatting-state", { state: CHATTING_STATUS.AUTHENTICATED });
});

whatsappClient.on("auth_failure", () => {
  console.log("Authentication failed!");
  socketServer.emit("chatting-state", { state: CHATTING_STATUS.FAILED });
  process.exit();
});

whatsappClient.on("ready", () => {
  console.log("Client is ready!");
  socketServer.emit("chatting-state", { state: CHATTING_STATUS.CONNECTED });
});

whatsappClient.on("disconnected", () => {
  console.log("Client disconnected");
  socketServer.emit("chatting-state", { state: CHATTING_STATUS.DISCONNECTED });
});

whatsappClient.initialize();

expressApp.use(router);

expressApp.use(
  (err: Error, _request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
);

export { httpServer };
