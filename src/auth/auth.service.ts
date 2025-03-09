import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  Req,
  Res,
} from '@nestjs/common';
import { CreateUser, LoginUser } from './dto';
import { User } from 'src/mongodb/schemas';
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

    return res.send({ email, name, _id });
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

    return res.send({ name, email, _id });
  }

  // async create(createCatDto: CreateCatDto): Promise<Cat> {
  //   const createdCat = new this.catModel(createCatDto);
  //   return createdCat.save();
  // }

  // here will be created user using email and nickname used in Discord (with standart model)

  discordAuth(@Req() req: Request | undefined, @Res() res: Response) {
    // res.send('hello');
    res.cookie('userDisInfo', req?.user);
    return res.redirect('http://localhost:3500/auth/check');
  }

  discordAuthRedirect(
    @Req()
    req: Request,
    @Res() res: Response,
  ) {
    //here I will be needed to work on frontend. Add passwords
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return res.status(200).json({ userInfo: req?.cookies?.userDisInfo });
  }

  logout(@Res() res: Response) {
    res.clearCookie('accessToken');
    return res.status(204);
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
