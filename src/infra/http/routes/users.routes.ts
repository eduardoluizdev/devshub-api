import { CreateUserController } from "@modules/user/controllers/create-user.controller";
import { Router } from "express";

const userRoutes = Router();

const createUserController = new CreateUserController();

userRoutes.post("/", createUserController.handle);

export { userRoutes };
