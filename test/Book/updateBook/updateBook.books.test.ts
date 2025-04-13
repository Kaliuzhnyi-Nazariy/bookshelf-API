import { UpdateBook } from 'src/book/dto';
import { Book } from 'src/mongodb/schemas';

export const updDTO: UpdateBook = {
  title: 'Law of success',
  author: 'Napoleon Hill',
  descripionAndOpinion: 'good book from famous author',
};

export const updDTO2: UpdateBook = {
  title: '10x Rule',
  author: 'Somebody',
};

export const readyBookOne: Book = {
  title: 'Law of success',
  author: 'Napoleon Hill',
  descripionAndOpinion: 'good book from famous author',
  imageUrl: '',
  favorite: false,
};

export const readyBookTwo: Book = {
  title: '10x Rule',
  author: 'Somebody',
  descripionAndOpinion: '',
  imageUrl: '',
  favorite: false,
};

export const readyBookThree: Book = {
  title: 'Law of success',
  author: 'Somebody',
  descripionAndOpinion: '',
  imageUrl: '',
  favorite: false,
};

export const readyBookFour: Book = {
  title: 'Law of success',
  author: 'Somebody',
  descripionAndOpinion: 'good book from famous author',
  imageUrl: '',
  favorite: false,
};

export const readyBookFive: Book = {
  title: 'Law of success',
  author: 'Somebody',
  descripionAndOpinion: 'How to attack your goals with 10x streingth',
  imageUrl: '',
  favorite: false,
};
