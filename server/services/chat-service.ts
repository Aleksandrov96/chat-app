import { ChatroomModel } from '../models/chatroom-model.js';
import { IUser } from 'interfaces/models/IUser.js';
import { IMessage } from 'interfaces/models/IMessage.js';

export class ChatService {
  static async accessChatroom(senderId: string, receiverId: string) {
    const chatroom = await ChatroomModel.find({
      $and: [
        { participants: { $elemMatch: { $eq: senderId } } },
        { participants: { $elemMatch: { $eq: receiverId } } },
      ],
    }).populate<{ participants: Omit<IUser, 'password'>[] }>('participants', '-password')
      .populate<{ latestMessage: IMessage }>('latestMessage')
      .populate({
        path: 'latestMessage',
        populate: { path: 'sender', select: 'email picture' },
      });
      
    if (chatroom.length > 0) {
      return chatroom[0];
    } else {
      const chatroomData = {
        participants: [senderId, receiverId],
      };

      const createdChatroom = await ChatroomModel.create(chatroomData);

      const fullChat = await ChatroomModel
        .findOne({ _id: createdChatroom._id })
        .populate<{ participants: Omit<IUser, 'password'>[] }>('participants', '-password');

      return fullChat;
    }
  }

  static async fetchUserChats(senderId: string) {
    const chats = await ChatroomModel.find({ participants: { $elemMatch: { $eq: senderId } } })
      .populate<{ participants: Omit<IUser, 'password'>[] }>('participants', '-password')
      .populate({
        path: 'latestMessage',
        populate: { path: 'sender', select: 'email picture' },
      })
      .sort({ updatedAt: -1 });
    return chats;
  }
}