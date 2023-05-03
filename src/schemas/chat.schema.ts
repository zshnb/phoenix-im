import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class PrivateChat {
  @Prop()
  id: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  target: User;
}

export const PrivateChatSchema = SchemaFactory.createForClass(PrivateChat);

export type PrivateChatDocument = HydratedDocument<PrivateChat>;

PrivateChatSchema.pre<PrivateChatDocument>('save', function (next) {
  this.id = this._id.toString();
  next();
});
