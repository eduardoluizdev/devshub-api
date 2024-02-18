import { Router } from "express";
import { sessionsRoutes } from "./sessions.routes";
import { userRoutes } from "./users.routes";
import { whatsappRoute } from "./whatsapp.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/sessions", sessionsRoutes);
router.use("/whatsapp", whatsappRoute);

router.use("/health_check", (_req, res) => {
  return res.json({ message: "Server is running" });
});

export { router };
