import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@Schema()
export class User {
  @Prop({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({ required: true, type: String, unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop({
    required: true,
    type: String,
    // match: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop({ default: [] })
  books: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
