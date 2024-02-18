import { socketServer, whatsappClient } from "@infra/http/app";

export class SendMessageInGroupUseCase {
  async execute(chatname: string, message: string) {
    if (chatname == undefined || message == undefined) {
      throw new Error("Phone or message not exists!");
    }

    const isAuthenticated = await whatsappClient.getState().then((value) => {
      return value === "CONNECTED";
    });

    if (isAuthenticated !== false) {
      whatsappClient.getChats().then((data) => {
        data.forEach((chat) => {
          if (chat.id.server === "g.us" && chat.name === chatname) {
            whatsappClient
              .sendMessage(chat.id._serialized, message)
              .then((response) => {
                if (response.id.fromMe) {
                  socketServer.emit("message", {
                    state: "success",
                    message: `Message successfully sent to ${chatname}`,
                  });
                }
              });

            return {
              state: "success",
              message: `Message successfully sent to ${chatname}`,
            };
          }
        });
      });
    }

    return { state: "waiting", message: "Waiting checking authentication..." };
  }
}
