import { RequestHandler, Router } from 'express';
import { UserController } from '../controllers/user-controller.js';
import { body } from 'express-validator';
import { authMiddleware } from '../middlewares/auth-middleware.js';
import { ChatController } from '../controllers/chat-controller.js';
import { MessageController } from '../controllers/message-controller.js';
import { upload } from '../middlewares/file-upload-middleware.js';
import { fileSizeLimitErrorHandler } from '../middlewares/file-upload-middleware.js';

export const router = Router();

router.post(
  '/sign-up', 
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 16 }),
  UserController.signUp.bind(UserController),
);
router.post('/sign-in', UserController.signIn.bind(UserController));
router.post('/sign-out', UserController.signOut.bind(UserController));
router.get('/refresh', UserController.refresh.bind(UserController));
router.get('/users', authMiddleware as RequestHandler, UserController.getUsers.bind(UserController));
router.get('/searchUsers', authMiddleware as RequestHandler, UserController.searchUsers.bind(UserController));

router.post('/accessChatroom', authMiddleware as RequestHandler, ChatController.accessChatroom.bind(ChatController));
router.get('/fetchUserChats', authMiddleware as RequestHandler, ChatController.fetchUserChats.bind(ChatController));

router.post('/sendMessage', [
  authMiddleware as RequestHandler, 
  upload.array('files'), 
  fileSizeLimitErrorHandler,
], MessageController.handleMessage.bind(MessageController));
router.get('/fetchChatMessages', authMiddleware as RequestHandler, MessageController.fetchChatMessages.bind(MessageController));
router.get('/fetchUnviewedMessages', authMiddleware as RequestHandler, MessageController.fetchUnviewedMessages.bind(MessageController));
router.post('/changeMessagesStatus', authMiddleware as RequestHandler, MessageController.changeMessageStatus.bind(MessageController));
