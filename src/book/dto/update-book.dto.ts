import { IsOptional, IsString } from 'class-validator';

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
}
