import { Schema, model } from 'mongoose';
import { IUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: [true, 'Name is required'] },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    password: {
      type: String,
      select: 0,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// Password hashing
userSchema.pre('save', async function (next) {
  const user = this as IUser;
  const hashedPassword = await bcrypt.hash(
    user.password as string,
    Number(config.salt_rounds),
  );
  user.password = hashedPassword;

  next();
});

export const User = model<IUser>('User', userSchema);
