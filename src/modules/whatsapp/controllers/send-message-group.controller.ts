import { Request, Response } from "express";
import { SendMessageInGroupUseCase } from "../user-cases/send-message-in-group";

export class SendMessageGroupController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;

    const { chatName } = request.params;
    const { message } = request.body;

    if (!user_id) {
      throw new Error("User not exists!");
    }

    const sendMessageGroupUseCase = new SendMessageInGroupUseCase();

    const status = await sendMessageGroupUseCase.execute(chatName, message);

    return response.json({ status });
  }
}
