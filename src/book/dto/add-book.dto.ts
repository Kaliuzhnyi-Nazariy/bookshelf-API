import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
}
