import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { TUser, TUserModel } from './user.interface';

const UserSchema = new Schema<TUser, TUserModel>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: 0,
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'manager'],
    },
    cart: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

// hashing password
UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

// removing the password from the returning data for user creation.
UserSchema.post('save', function (doc, next) {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { password, ...userDataWithoutPassword } = this.toObject();
  this.set('password', undefined, { strict: false });

  // Update the document with userDataWithoutPassword
  Object.assign(this, userDataWithoutPassword);
  next();
});

// method for finding user
UserSchema.statics.isUserExists = async function (email: string) {
  return await this.findOne({ email }).select('+password');
};

// method for comparing password
UserSchema.statics.isPasswordMatched = async function (
  plainPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

const User = model<TUser, TUserModel>('User', UserSchema);

export default User;
