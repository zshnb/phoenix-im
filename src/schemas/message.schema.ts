import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
import { PrivateChat } from './chat.schema';

export type MessageType = 'text' | 'audio' | 'file' | 'image' | 'video';
export type SessionType = 'private' | 'group';
export type MessageStatus = 'unread' | 'read';
@Schema()
export class Message {
  @Prop()
  id: string;

  @Prop()
  type: MessageType;

  @Prop()
  sessionType: SessionType;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PrivateChat',
    required: false,
  })
  privateChat: PrivateChat;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  target: User;

  @Prop()
  status: MessageStatus;

  @Prop()
  sendAt: number;

  @Prop()
  content: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

export type MessageDocument = HydratedDocument<Message>;

MessageSchema.pre<MessageDocument>('save', function (next) {
  this.id = this._id.toString();
  next();
});
