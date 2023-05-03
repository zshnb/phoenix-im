import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class User {
  @Prop()
  id: string;
  @Prop({ name: 'user_name' })
  userName: string;
  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserDocument = HydratedDocument<User>;

UserSchema.pre<UserDocument>('save', function (next) {
  this.id = this._id.toString();
  next();
});
