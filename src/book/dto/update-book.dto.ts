import { IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateBook {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  author: string;

  @IsString()
  @IsOptional()
  descripionAndOpinion?: string;

  imageUrl: string;

  owner: Types.ObjectId;
}
