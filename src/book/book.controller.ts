import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AddBook, UpdateBook } from './dto';

@Controller('book')
export class BookController {
  @Get('')
  allBooks() {
    console.log('nothing');
    return 'nothing in return';
  }

  @Get(':id')
  getBookById(@Param('id') id: string) {
    console.log(id);
    return `in return id: ${id}`;
  }

  @Post()
  addBookInShelf(@Body() data: AddBook) {
    return { data };
  }

  @Patch(':bookId')
  updateBook(@Param('bookId') bookId: string, @Body() dto: UpdateBook) {
    return { bookId, dto };
  }

  @Delete(':bookId')
  deleteBook(@Param('bookId') bookId: string) {
    return { bookId };
  }
}
