import { MessageModel } from '../models/message-model.js';
import { ChatroomModel } from '../models/chatroom-model.js';
import { IUnviewedMesssage } from 'interfaces/IUnviewedMesssage.js';

export class MessageService {
  static async handleMessage(
    content: string, 
    chatroomId: string, 
    userId: string,
    file?: { url: string, mimetype: string },
  ) {

    const newMessage = {
      sender: userId,
      content,
      chatroom: chatroomId,
      isViewed: false,
      files: [file],
    };

    let message = await MessageModel.create(newMessage);

    message = await message.populate('sender', 'email picture');
    message = await message.populate('chatroom');
    message = await message.populate({
      path: 'chatroom',
      populate: {  path: 'participants', select: 'email picture' },
    });

    await ChatroomModel.findByIdAndUpdate(chatroomId, {
      latestMessage: message,
    });
    
    return message;
  }

  static async fetchChatMessages(chatroomId: string, skip: string, limit: string) {
    let skipValue;
    let limitValue;

    if (skip) {
      skipValue = +skip;
    } else {
      skipValue = 0;
    }
  
    if (limit) {
      limitValue = +limit + 10;
    } else {
      limitValue = 10;
    }
    
    const messages = await MessageModel.find({ chatroom: chatroomId })
      .populate('sender', 'email picture')
      .populate({
        path: 'chatroom',
        populate: {  path: 'participants', select: 'email picture' },
      })
      .sort({ createdAt: -1 })
      .skip(skipValue)
      .limit(limitValue);
  
    return messages.reverse();
  }

  static async fetchUnviewedMessages(userId: string): Promise<IUnviewedMesssage[]> {
    const unviwedMessages: IUnviewedMesssage[] = await MessageModel.find({ isViewed: false })
      .populate('sender', 'email picture')
      .populate({
        path: 'chatroom',
        populate: {  path: 'participants', select: 'email picture' },
      });

    const userUnviwedMessages = unviwedMessages.filter((message) => (
      message.sender._id.toString() !== userId 
      &&
      message.chatroom.participants.find((participant) => participant._id.toString() === userId)),
    );

    return userUnviwedMessages;
  }

  static changeMessagesStatus(messagesIDs: string[]): Promise<void>[] {
    messagesIDs.map(async (messageId) => {
      await MessageModel.findByIdAndUpdate(messageId, {
        isViewed: true,
      });
    });
    const changedMessages = messagesIDs.map(async (messageId) => {
      await MessageModel.findById(messageId)
        .populate('sender', 'email picture')
        .populate({
          path: 'chatroom',
          populate: {  path: 'participants', select: 'email picture' },
        });
    }); 

    return changedMessages;
  }
}