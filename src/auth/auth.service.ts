import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  Req,
  Res,
} from '@nestjs/common';
import { CreateUser, LoginUser } from './dto';
import { User } from '../mongodb/schemas';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userSchema: Model<User>,
    private jwt: JwtService,
    private config: ConfigService,
    @InjectModel(User.name) private User: Model<User>,
  ) {}

  async signin(dto: LoginUser, @Res() res: Response) {
    const user = await this.userSchema.findOne({ email: dto.email });

    if (!user) throw new ForbiddenException('Wrong credentials!');

    const psswCompare = await argon.verify(user.password, dto.password);

    if (!psswCompare) throw new ForbiddenException('Wrong credentials!');

    const accessToken = await this.signToken(user.email, user._id);

    res.cookie('accessToken', accessToken, {
      maxAge: 23 * 60 * 60 * 1000,
    });

    const { email, name, _id } = user;

    return res.send({ email, name, _id, accessToken });
  }

  async signup(dto: CreateUser, @Res() res: Response) {
    const isUser = await this.userSchema.findOne({ email: dto.email });

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
    const accessToken = await this.signToken(email, _id);

    res.cookie('accessToken', accessToken, {
      maxAge: 23 * 60 * 60 * 1000,
    });

    return res.send({ name, email, _id, accessToken });
  }

  // async create(createCatDto: CreateCatDto): Promise<Cat> {
  //   const createdCat = new this.catModel(createCatDto);
  //   return createdCat.save();
  // }

  async discordAuth(@Req() req: Request | undefined, @Res() res: Response) {
    // res.send('hello');
    res.cookie('userDisInfo', req?.user);
    console.log(req?.user);

    if (!req?.user) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: No user data received' });
    }

    const { name, email } = req?.user as {
      name?: string;
      email?: string;
    };

    console.log('name: ', name);
    console.log('email: ', email);

    if (!name || !email)
      return res.status(404).json({ message: 'Wrong credentials! Try again!' });

    const newUser = await this.User.create({
      name,
      email,
      password: 'Abcde12!',
    });

    // return res.redirect('http://localhost:3500/auth/check');
    return res.status(200).json({
      _id: newUser?._id,
      name: newUser.name,
      email: newUser.email,
    });
  }

  // here will be created user using email and nickname used in Discord (with standart model)

  redirectDiscordAuth(@Req() req: Request | undefined, @Res() res: Response) {
    // res.send('hello');
    res.cookie('userDisInfo', req?.user);
    // return res.redirect('http://localhost:3500/auth/check');
    return res.status(200).json(req?.user);
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
    res.clearCookie('accessToken');
    return res.status(204).json();
    // const user = await this.userSchema.findById();ExceptionsHandler
  }

  async signToken(email: string, _id: Types.ObjectId): Promise<string> {
    const payload = {
      email,
      _id,
    };

    const secret: string = this.config.get('JWT_SECRET') as string;

    const token: string = await this.jwt.signAsync(payload, {
      expiresIn: '23h',
      secret,
    });

    return token;
  }
}
