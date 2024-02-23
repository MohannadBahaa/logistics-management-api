import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  @IsNotEmpty()
  fullName: string;

  @Prop({ required: true, unique: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Prop({ required: true })
  @IsNotEmpty()
  @MinLength(8)
  @Exclude()
  password: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ enum: ['Admin', 'User'], default: 'User' })
  role: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
