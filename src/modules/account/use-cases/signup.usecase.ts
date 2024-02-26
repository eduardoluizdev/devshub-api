import { hash } from "bcryptjs";
import { prisma } from "@infra/prisma/client";
import { sign } from "jsonwebtoken";
import { auth } from "@config/auth";
import { ISignUpDTO } from "../dtos/signup.dto";
import { security } from "@config/security";

export class SignUpUseCase {
  async execute({ name, email, password }: ISignUpDTO): Promise<{}> {
    const userExist = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userExist) {
      throw new Error("User already exists");
    }

    const hashedPassword = await hash(password, security.salt);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const accessToken = sign({ role: user.role }, auth.secretKey, {
      subject: user.id,
      expiresIn: auth.expiresIn,
    });

    return {
      accessToken,
    };
  }
}
