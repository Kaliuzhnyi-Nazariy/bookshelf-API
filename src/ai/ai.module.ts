import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service'; // ✅ Import this
import { MongooseModule } from '@nestjs/mongoose';
import { AIAnswer, AIAnswerSchema } from 'src/mongodb/schemas/AIAnswer.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AIAnswer.name, schema: AIAnswerSchema },
    ]),
    JwtModule.register({}),
  ],
  controllers: [AiController],
  providers: [AiService],
})
export class AiModule {}
