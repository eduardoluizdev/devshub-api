import { hash } from "bcryptjs";
import { prisma } from "@infra/prisma/client";
import { security } from "@config/security";
import { User } from "@prisma/client";
import { ICreateUserDTO } from "../dtos/create-user.dto";

export class CreateUserUseCase {
  async execute({ name, email, password }: ICreateUserDTO): Promise<User> {
    const hasUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (hasUser) {
      throw new Error("User already exists");
    }

    const hashPassword = await hash(password, security.salt);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });

    return user;
  }
}
