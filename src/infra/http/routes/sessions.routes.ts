import { Router } from "express";
import { SignInController } from "@modules/account/controllers/signin.controller";
import { SignUpController } from "@modules/account/controllers/signup.controller";

const sessionsRoutes = Router();

const signInController = new SignInController();
const signUpController = new SignUpController();

sessionsRoutes.post("/signin", signInController.handle);
sessionsRoutes.post("/signup", signUpController.handle);

export { sessionsRoutes };
