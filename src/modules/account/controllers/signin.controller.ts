import { Request, Response } from "express";
import { SignInUseCase } from "../use-cases/signin.usecase";

export class SignInController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const signInUseCase = new SignInUseCase();
    const access_token = await signInUseCase.execute({ email, password });

    return response.json(access_token);
  }
}
