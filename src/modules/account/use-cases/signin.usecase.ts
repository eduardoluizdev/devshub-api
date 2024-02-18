import { compare } from "bcryptjs";
import { prisma } from "@infra/prisma/client";
import { sign } from "jsonwebtoken";
import { auth } from "@config/auth";
import { ISignInDTO } from "../dtos/signin.dto";

export class SignInUseCase {
  async execute({ email, password }: ISignInDTO): Promise<{}> {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("Email or password incorrect");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email or password incorrect");
    }

    const access_token = sign({ role: user.role }, auth.secretKey, {
      subject: user.id,
      expiresIn: auth.expiresIn,
    });

    return {
      access_token,
    };
  }
}
