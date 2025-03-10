import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { AddBook, UpdateBook } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from 'src/mongodb/schemas';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private BookSchema: Model<Book>,
    private cloudinaryService: CloudinaryService,
  ) {}

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

  async addBook(
    userId: Types.ObjectId,
    dto: AddBook,
    file?: Express.Multer.File,
  ) {
    let coverImage: string = '';

    if (file) {
      const uploadResult = await this.cloudinaryService.uploadImage(file);
      coverImage = uploadResult.secure_url;
    }

    const res = await this.BookSchema.create({
      title: dto.title,
      author: dto.author,
      owner: userId._id,
      imageUrl: coverImage,
    });

    return res;
  }

  async updateBook(
    userId: Types.ObjectId,
    bookId: Types.ObjectId,
    dto: UpdateBook,
    file: Express.Multer.File,
  ) {
    let imageUrl: string = dto.imageUrl;

    if (file) {
      const resultURL = await this.cloudinaryService.uploadImage(file);
      // imageUrl = resultURL.secure_url;

      if (imageUrl !== resultURL.secure_url) imageUrl = resultURL.secure_url;
    }

    const bookToUpdate = await this.BookSchema.findOne({
      _id: bookId,
      owner: userId,
    });

    if (!bookToUpdate) throw new NotFoundException('This book is not found');

    const updatedBook = await this.BookSchema.findByIdAndUpdate(
      bookId,
      {
        title: dto.title,
        descripionAndOpinion: dto.descripionAndOpinion,
        author: dto.author,
        imageUrl: dto.imageUrl,
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
