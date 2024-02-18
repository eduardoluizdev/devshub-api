import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { auth } from "@config/auth";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticate(
  request: Request,
  _response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error("Token missing");
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(token, auth.secretKey) as IPayload;

    request.user_id = sub;

    return next();
  } catch (err) {
    throw new Error("Invalid token");
  }
}
