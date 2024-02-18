import { Request, Response } from "express";
import { CreateUserUseCase } from "../use-cases/create-user.usecase";

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserUseCase = new CreateUserUseCase();

    await createUserUseCase.execute({
      name,
      email,
      password,
    });

    return response.status(201);
  }
}
