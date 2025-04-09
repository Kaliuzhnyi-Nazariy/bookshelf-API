import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AddBook, UpdateBook } from './dto';
import { JWTGuard } from '../auth/guards';
import { GetUser } from '../auth/decorators';
import { BookService } from './book.service';
import { Types } from 'mongoose';

@UseGuards(JWTGuard)
@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get('')
  allBooks(@GetUser('_id') userId: Types.ObjectId) {
    return this.bookService.getAllBooks(userId);
  }

  @Get(':id')
  getBookById(
    @GetUser('_id') userId: Types.ObjectId,
    @Param('id') id: Types.ObjectId,
  ) {
    return this.bookService.getBook(userId, id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  addBookToShelf(
    @GetUser('_id') userId: Types.ObjectId,
    @Body() data: AddBook,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.bookService.addBook(userId, data, file);
  }

  @Put(':bookId')
  @UseInterceptors(FileInterceptor('file'))
  updateBook(
    @GetUser('_id') userId: Types.ObjectId,
    @Param('bookId') bookId: Types.ObjectId,
    @Body() dto: UpdateBook,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.bookService.updateBook(userId, bookId, dto, file);
  }

  @Delete(':bookId')
  deleteBook(
    @GetUser('_id') userId: Types.ObjectId,
    @Param('bookId') bookId: Types.ObjectId,
  ) {
    return this.bookService.deleteBook(userId, bookId);
  }
}
