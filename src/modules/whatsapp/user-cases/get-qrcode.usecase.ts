import { CHATTING_STATUS } from "@config/chatting";
import { socketServer, whatsappClient } from "@infra/http/app";
import fs from "node:fs";

export class GetQrCodeUseCase {
  async execute() {
    try {
      const isClientConnected = await whatsappClient
        .getState()
        .then((value) => {
          return value;
        });

      if (isClientConnected === "CONNECTED") {
        socketServer.emit("chatting-state", {
          state: CHATTING_STATUS.AUTHENTICATED,
        });
        return {
          state: "success",
          message: "Client is already authenticated",
        };
      }

      if (isClientConnected === null) {
        const qrData = await this.readQrCodeData();
        const qrCodeUrl = await this.generateQrCodeUrl(qrData);

        return {
          state: "success",
          message: "QRCode generated successfully",
          data: {
            qrCodeUrl,
          },
        };
      }
    } catch (error) {
      return {
        state: "error",
        message: "Client is not authenticated",
      };
    }
  }

  private readQrCodeData(): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readFile("./src/infra/http/qrcode/qr.txt", "utf8", (err, data) => {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }
        resolve(data);
      });
    });
  }

  private generateQrCodeUrl(data: string): Promise<string> {
    return new Promise((resolve, reject) => {
      resolve(data);
    });
  }
}
