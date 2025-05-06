import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  // NotFoundException,
  Req,
  Res,
} from '@nestjs/common';
import { CreateUser, LoginUser } from './dto';
import { User } from '../mongodb/schemas';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as argon from 'argon2';
import { Request, Response } from 'express';
import { CreateTokenService } from 'src/helper/create-token.service';

@Injectable()
export class AuthService {
  constructor(
    private tokenService: CreateTokenService,
    @InjectModel(User.name) private userSchema: Model<User>,
    @InjectModel(User.name) private User: Model<User>,
  ) {}

  async signin(dto: LoginUser, @Res() res: Response) {
    const user = await this.userSchema.findOne({ email: dto.email });

    if (!user) throw new ForbiddenException('Wrong credentials!');

    const psswCompare = await argon.verify(user.password, dto.password);

    if (!psswCompare) throw new ForbiddenException('Wrong credentials!');

    const accessToken = await this.tokenService.signToken(user.email, user._id);

    res.cookie('accessToken', accessToken, {
      maxAge: 23 * 60 * 60 * 1000,
      secure: true,
      sameSite: 'none',
      httpOnly: true,
    });

    const { email, name, _id } = user;

    return res.status(200).json({ email, name, _id, accessToken });
  }

  async signup(dto: CreateUser, @Res() res: Response) {
    const isUser = await this.userSchema.findOne({ email: dto.email });

    // console.log('triggered');

    if (isUser)
      throw new ConflictException(
        'User with this credentials is already exist!',
      );

    if (dto.password !== dto.confirmPassword)
      throw new BadRequestException('Passwords do not match!');

    const hashedPassword = await argon.hash(dto.password);
    const newUser = await this.userSchema.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
    });

    const { name, email, _id } = newUser;
    const accessToken = await this.tokenService.signToken(email, _id);

    // res.cookie('accessToken', accessToken, {
    //   maxAge: 23 * 60 * 60 * 1000,
    //   // secure: true,
    //   httpOnly: true,
    //   // sameSite: 'none',
    //   path: '/',
    //   domain: 'my-fav-bookshelf-app.netlify.app',
    // });

    res.cookie('accessToken', accessToken, {
      maxAge: 23 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'lax', // or 'strict' for tighter security
      secure: false,
      path: '/',
    });

    return res.send({ name, email, _id, accessToken });
  }

  // async create(createCatDto: CreateCatDto): Promise<Cat> {
  //   const createdCat = new this.catModel(createCatDto);
  //   return createdCat.save();
  // }

  discordAuth(@Req() req: Request | undefined, @Res() res: Response) {
    // res.send('hello');
    res.cookie('userDisInfo', req?.user, { secure: true, sameSite: 'none' });
    return res.status(302).json();
  }

  async redirectDiscordAuth(
    @Req() req: Request | undefined,
    @Res() res: Response,
  ) {
    if (!req?.user) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: No user data received' });
    }

    const { name, email } = req?.user as {
      name?: string;
      email?: string;
    };

    if (!name || !email)
      return res.status(404).json({ message: 'Wrong credentials! Try again!' });

    const user = await this.User.findOne({ email }).select('-password -__v');

    //create and set jwt token

    if (user) {
      const { _id } = user as { _id: Types.ObjectId };
      const accessToken = await this.tokenService.signToken(email, _id);

      return res
        .status(200)
        .cookie('accessToken', accessToken, {
          maxAge: 23 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: 'lax', // or 'strict' for tighter security
          secure: false,
          path: '/',
        })
        .json(user);
    }

    try {
      const newUser = await this.User.create({
        name,
        email,
        password: 'Abcde12!',
      });

      //create and set jwt token
      const accessToken = await this.tokenService.signToken(
        newUser.email,
        newUser._id,
      );

      return res.status(201).cookie('accessToken', accessToken).json({
        _id: newUser?._id,
        name: newUser.name,
        email: newUser.email,
        // books: newUser.books,
      });
    } catch (error) {
      console.error('Error creating user:', error);
      return res
        .status(500)
        .json({ message: 'Internal server error in /discord' });
    }
  }

  // discordAuthRedirect(
  //   @Req()
  //   req: Request,
  //   @Res() res: Response,
  // ) {
  //   //here I will be needed to work on frontend. Add passwords
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //   return res.status(200).json({ userInfo: req?.cookies?.userDisInfo });
  // }

  logout(@Res() res: Response) {
    // res.clearCookie('accessToken', {
    //   path: '/',
    //   sameSite: 'none',
    //   secure: true,
    // });
    res.clearCookie('accessToken', {
      maxAge: 23 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'lax', // or 'strict' for tighter security
      secure: false,
      path: '/',
    });
    // res.setHeader('Authorization', '');
    return res.status(204).json().end();
    // const user = await this.userSchema.findById();ExceptionsHandler
  }
}
