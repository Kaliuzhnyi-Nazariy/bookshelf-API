import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AiService } from './ai.service';
import { JWTGuard } from 'src/auth/guards';
import { GetUser } from 'src/auth/decorators';

@UseGuards(JWTGuard)
@Controller('ai')
export class AiController {
  constructor(private AIService: AiService) {}

  @Get()
  async fetchRecomendations(@GetUser('_id') userId: string) {
    return this.AIService.fetchRecomendations(userId);
  }

  @Post('/recomendations')
  async getRecommendations(
    @GetUser('_id') userId: string,
    @Body() bookTitles?: string[],
  ) {
    const response = await this.AIService.getRecommendations(
      userId,
      bookTitles,
    );
    return { result: response };
  }
}
