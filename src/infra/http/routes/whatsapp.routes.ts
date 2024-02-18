import { Router } from "express";
import { ensureAuthenticate } from "../middleware/ensure-authenticate.middleware";
import { ensureAdmin } from "../middleware/ensure-admin.middleware";
import { GetQrCodeController } from "@modules/whatsapp/controllers/get-qrcode.controller";
import { SendMessageController } from "@modules/whatsapp/controllers/send-message.controller";
import { SendMessageGroupController } from "@modules/whatsapp/controllers/send-message-group.controller";

const whatsappRoute = Router();

const getQrCodeController = new GetQrCodeController();
const sendMessageController = new SendMessageController();
const sendMessageGroupController = new SendMessageGroupController();

whatsappRoute.get(
  "/qrcode",
  [ensureAuthenticate, ensureAdmin],
  getQrCodeController.handle
);

whatsappRoute.post(
  "/sendmessagetochat/:phoneNumber",
  [ensureAuthenticate, ensureAdmin],
  sendMessageController.handle
);

whatsappRoute.post(
  "/sendmessagetogroup/:chatName",
  [ensureAuthenticate, ensureAdmin],
  sendMessageGroupController.handle
);

export { whatsappRoute };
