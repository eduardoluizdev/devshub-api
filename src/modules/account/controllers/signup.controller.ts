import { Request, Response } from "express";
import { SignUpUseCase } from "../use-cases/signup.usecase";

export class SignUpController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const signUpUseCase = new SignUpUseCase();
    const accessToken = await signUpUseCase.execute({ name, email, password });

    return response.json(accessToken);
  }
}
