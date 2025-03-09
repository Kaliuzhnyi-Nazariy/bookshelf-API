import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { AddBook, UpdateBook } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from 'src/mongodb/schemas';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private BookSchema: Model<Book>) {}

  async getAllBooks(userId: Types.ObjectId) {
    return await this.BookSchema.find({ owner: userId._id });
  }

  async getBook(userId: Types.ObjectId, bookId: Types.ObjectId) {
    const book = await this.BookSchema.findOne({
      _id: bookId,
      owner: userId._id,
    });

    return book;
  }

  async addBook(userId: Types.ObjectId, dto: AddBook) {
    const res = await this.BookSchema.create({
      title: dto.title,
      author: dto.author,
      owner: userId._id,
    });

    return res;
  }

  async updateBook(
    userId: Types.ObjectId,
    bookId: Types.ObjectId,
    dto: UpdateBook,
  ) {
    const bookToUpdate = await this.BookSchema.findOne({
      _id: bookId,
      owner: userId,
    });

    if (!bookToUpdate) throw new NotFoundException('This book is not found');

    const updatedBook = await this.BookSchema.findByIdAndUpdate(
      bookId,
      {
        bookToUpdate,
        ...dto,
      },
      { new: true },
    );

    return updatedBook;
  }

  async deleteBook(userId: Types.ObjectId, bookId: Types.ObjectId) {
    const bookToDelete = await this.BookSchema.findOne({
      _id: bookId,
      owner: userId._id,
    });

    if (!bookToDelete) throw new NotFoundException('Book is not found!');

    await this.BookSchema.findByIdAndDelete(bookId);

    return { message: 'Deleted successfully!' };
  }
}
