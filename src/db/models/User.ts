import { Schema, model, Model } from "mongoose";
import { NextFunction } from "express";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUserDocument } from "../../interfaces/IUserDocument";

// Methods
export interface IUser extends IUserDocument {
  generateAuthToken(): Promise<string>;
}

// Statics
export interface IUserModel extends Model<IUser> {
  findByCredentials: (
    password: string,
    email?: string,
    username?: string
  ) => Promise<IUser>;
}

const userSchema: Schema = new Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value: string): any {
      if (!validator.isEmail(value)) {
        throw new Error("Not a valid email");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value: string): any {
      if (value.includes("password")) {
        throw new Error("Password can not contain the word 'password'.");
      }
    },
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// Hide Password and Tokens
userSchema.methods.toJSON = function (): IUser {
  const user = this;
  const userObject: IUser = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

// Find login credentials
userSchema.statics.findByCredentials = async (
  password: string,
  username?: string,
  email?: string
): Promise<IUser> => {
  const user: IUser | null = await User.findOne(
    email !== undefined ? { email } : { username }
  );

  if (!user) {
    throw new Error("Unable to login.");
  }

  const isMatch: boolean = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login.");
  }

  return user;
};

// Hash password
userSchema.pre<IUser>("save", async function (
  this: IUser,
  next: NextFunction
): Promise<void> {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// Generate Token
userSchema.methods.generateAuthToken = async function (): Promise<string> {
  const user = this;

  const token: string = jwt.sign(
    { _id: user._id.toString() },
    `${process.env.MK_NODE_MONGO_SECRET}`
  );

  user.tokens = [...user.tokens, { token }];

  await user.save();

  return token;
};

const User: IUserModel = model<IUser, IUserModel>("User", userSchema);

export default User;
