import { Request, Response } from "express";
import { SendMessageUseCase } from "../user-cases/send-message.usecase";

export class SendMessageController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;

    const { phoneNumber } = request.params;
    const { message } = request.body;

    if (!user_id) {
      throw new Error("User not exists!");
    }

    const sendMessageUseCase = new SendMessageUseCase();

    const status = await sendMessageUseCase.execute(phoneNumber, message);

    return response.json({ status });
  }
}
