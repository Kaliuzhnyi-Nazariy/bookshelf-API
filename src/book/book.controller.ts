import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AddBook, UpdateBook } from './dto';
import { UltimateGuard } from 'src/auth/guards';
import { GetUser } from 'src/auth/decorators';
import { BookService } from './book.service';
import { Types } from 'mongoose';

@UseGuards(UltimateGuard)
@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get('')
  allBooks(@GetUser() userId: Types.ObjectId) {
    return this.bookService.getAllBooks(userId);
  }

  @Get(':id')
  getBookById(
    @GetUser() userId: Types.ObjectId,
    @Param('id') id: Types.ObjectId,
  ) {
    return this.bookService.getBook(userId, id);
  }

  @Post()
  addBookToShelf(@GetUser() userId: Types.ObjectId, @Body() data: AddBook) {
    return this.bookService.addBook(userId, data);
  }

  @Put(':bookId')
  updateBook(
    @GetUser('_id') userId: Types.ObjectId,
    @Param('bookId') bookId: Types.ObjectId,
    @Body() dto: UpdateBook,
  ) {
    return this.bookService.updateBook(userId, bookId, dto);
  }

  @Delete(':bookId')
  deleteBook(
    @GetUser() userId: Types.ObjectId,
    @Param('bookId') bookId: Types.ObjectId,
  ) {
    return this.bookService.deleteBook(userId, bookId);
  }
}
