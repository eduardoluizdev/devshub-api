import { verify } from "jsonwebtoken";
import { auth } from "@config/auth";
import { NextFunction, Request, Response } from "express";

interface IPayload {
  role: "CUSTOMER" | "ADMIN";
  sub: string;
}

export const ensureAdmin = async (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error("Token missing");
  }

  const [, token] = authHeader.split(" ");

  try {
    const { role } = verify(token, auth.secretKey) as IPayload;

    if (role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    return next();
  } catch (err) {
    throw new Error("Unauthorized");
  }
};
