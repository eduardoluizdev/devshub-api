import { whatsappNumber } from "@config/whatsapp-number";
import { socketServer, whatsappClient } from "@infra/http/app";

export class SendMessageUseCase {
  async execute(phoneNumber: string, message: string) {
    if (phoneNumber == undefined || message == undefined) {
      throw new Error("Phone or message not exists!");
    }

    const phoneFormatted = whatsappNumber(phoneNumber);

    const isAuthenticated = await whatsappClient.getState().then((value) => {
      return value === "CONNECTED";
    });

    if (isAuthenticated !== false) {
      whatsappClient.sendMessage(phoneFormatted, message).then((response) => {
        if (response.id.fromMe) {
          socketServer.emit("message", {
            state: "success",
            message: `Message successfully sent to ${phoneNumber}`,
          });
        }
      });

      return {
        state: "success",
        message: `Message successfully sent to ${phoneNumber}`,
      };
    }

    return { state: "waiting", message: "Waiting checking authentication..." };
  }
}
