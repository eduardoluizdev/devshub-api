import { Request, Response } from "express";
import { SignInUseCase } from "../use-cases/signin.usecase";

export class SignInController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const signInUseCase = new SignInUseCase();
    const accessToken = await signInUseCase.execute({ email, password });

    return response.json(accessToken);
  }
}
