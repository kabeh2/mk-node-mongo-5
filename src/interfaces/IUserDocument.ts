import { Document } from "mongoose";

export interface IUserDocument extends Document {
  username: string;
  email: string;
  password: string;
  tokens: { token: string }[];
  [key: string]: any;
}
