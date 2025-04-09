import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import mongoose from 'mongoose';
// import { Types } from 'mongoose';

@Schema()
export class User {
  @Prop({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({ required: true, type: String, unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop({
    // required: true,
    type: String,
    // match: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  })
  @IsString()
  // @IsNotEmpty()
  password: string;

  // @Prop({ default: [] })
  // books: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);

// UserSchema.pre('findOneAndDelete', async function (next) {
//   const filter = this.getFilter();
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//   const user = await this.model.findOne(filter);

//   if (user) {
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//     await mongoose.model('Book').deleteMany({ owner: user._id });
//   }

//   next();
// });
