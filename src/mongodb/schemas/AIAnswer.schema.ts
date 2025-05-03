import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

@Schema()
export class AIAnswer {
  @Prop({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  answer: string;

  @Prop({ required: true, type: Types.ObjectId || String, ref: 'User' })
  owner: string;
}

export const AIAnswerSchema = SchemaFactory.createForClass(AIAnswer);
