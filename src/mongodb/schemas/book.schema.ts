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

  @Prop({ type: String })
  @IsString()
  @IsOptional()
  descripionAndOpinion?: string;

  @Prop({ type: Types.ObjectId || String, ref: 'User' })
  @IsString()
  owner?: Types.ObjectId | string;

  @Prop({ type: String })
  @IsString()
  imageUrl?: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
