import { Schema, model, Document } from "mongoose";
import validator from "validator";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

const userSchema: Schema = new Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true
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
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value: string): any {
      if (value.includes("password")) {
        throw new Error("Password can not contain the word 'password'.");
      }
    }
  }
});

const User = model<IUser>("User", userSchema);

export default User;
