import mongoose, { Schema, Document, Types, Model } from 'mongoose';

export interface IUser extends Document {
  branch_id: Types.ObjectId;
  username: string;
  name: string;
  surname: string;
  id_number: string;
  email_address: string;
  mobile_number: string;
  gender_id?: Types.ObjectId;
  password_id: Types.ObjectId;
  user_type_id: Types.ObjectId;
  confirmed: boolean;
  active: boolean;
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    branch_id: { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    id_number: { type: String, required: true, unique: true },
    email_address: { type: String, required: true, unique: true },
    mobile_number: { type: String, required: true },
    gender_id: { type: Schema.Types.ObjectId, ref: 'Gender', required: false },
    password_id: { type: Schema.Types.ObjectId, ref: 'Password', required: true },
    user_type_id: { type: Schema.Types.ObjectId, ref: 'UserType', required: true },
    confirmed: { type: Boolean, required: true },
    active: { type: Boolean, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export default User;
