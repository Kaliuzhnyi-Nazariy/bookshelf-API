import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

@Schema()
export class Book {
  @Prop({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  title: string;

  @Prop({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsOptional()
  descripionAndOpinion?: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  @IsString()
  owner: Types.ObjectId;

  @Prop({ type: String })
  @IsString()
  imageUrl?: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
