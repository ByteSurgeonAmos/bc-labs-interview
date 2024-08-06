import { Router } from "express";
import { ConversationController } from "../controllers/app.controllers";

const router = Router();

router.post("/query", ConversationController.query);
router.get("/conversations", ConversationController.getConversations);
router.get("/conversations/:id", ConversationController.getConversationById);

export default router;
