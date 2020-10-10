import { Schema, model, models, Document } from "mongoose";

export interface IUserModel extends Document {
  name: String;
  email: String;
  password: String;
  date: Date;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, "please add name"],
    min: 6,
    max: 70,
  },
  email: {
    type: String,
    required: [true, "please add email"],
    unique: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: [true, "please add password"],
    min: 6,
    max: 1024,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const UserModel = models.User || model<IUserModel>("User", UserSchema);
export default UserModel;
