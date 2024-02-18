import { Request, Response } from "express";
import { GetQrCodeUseCase } from "../user-cases/get-qrcode.usecase";

export class GetQrCodeController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;

    if (!user_id) {
      throw new Error("User not exists!");
    }

    const getQrCodeUseCase = new GetQrCodeUseCase();
    const qr = await getQrCodeUseCase.execute();

    return response.json({ qr });
  }
}
