import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class AddBook {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsOptional()
  descripionAndOpinion?: string;

  @IsBoolean()
  @IsOptional()
  favorite?: boolean;

  imageUrl?: string;

  owner?: Types.ObjectId;
}
