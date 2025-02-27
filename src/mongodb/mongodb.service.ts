import {
  Injectable,
  // OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class MongodbService implements OnModuleDestroy {
  // export class MongodbService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private config: ConfigService,
  ) {}

  //   onModuleInit() {
  //     console.log('Mongo host:', this.connection.host);
  //   }

  async onModuleDestroy() {
    await this.connection.close();
  }

  async cleanDB() {
    await Promise.all(
      Object.values(this.connection.collections).map(async (collection) => {
        await collection.deleteMany({});
      }),
    );
  }
}
