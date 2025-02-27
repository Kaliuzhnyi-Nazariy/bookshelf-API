import { Prop, Schema } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';

@Schema()
export class Book {
  @Prop({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  title: string;
}
