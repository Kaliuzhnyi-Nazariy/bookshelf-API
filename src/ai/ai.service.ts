import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import fetch from 'node-fetch';
import { AIAnswer } from 'src/mongodb/schemas';

@Injectable()
export class AiService {
  key = process.env.OPEN_AI_KEY;
  link = process.env.AI_LINK;
  booksForRequest: string | undefined = '';

  constructor(
    @InjectModel(AIAnswer.name)
    private AIAnswerModel: Model<AIAnswer>,
  ) {}

  async fetchRecomendations(userId: string | Types.ObjectId) {
    const allRecs = await this.AIAnswerModel.find({ owner: userId });

    const resAllRecs = allRecs.map((ans) => ans.answer);

    return resAllRecs;
  }

  async getRecommendations(
    userId: string | Types.ObjectId,
    booksTitles: string[] | undefined,
  ): Promise<string> {
    if (!booksTitles || booksTitles.length === 0) {
      return 'Add favorite books for request!';
    }

    this.booksForRequest = booksTitles.join(', ');

    const request = await fetch(this.link!, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are a book reviewer who recommends books similar in theme and purpose.',
          },
          {
            role: 'user',
            content: `According to these books: ${this.booksForRequest} give me a book list which will be related to them. Response should contain only 3 books and be like: 'title of book' by 'author' and that's it.`,
          },
        ],
      }),
    });

    const data: any = await request.json();

    const answer =
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (data.choices?.[0]?.message?.content as string) ||
      'No response from OpenAI';

    await this.AIAnswerModel.create({ owner: userId, answer });
    return answer;
  }
}
