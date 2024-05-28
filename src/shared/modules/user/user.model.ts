import { Schema, Document, model} from 'mongoose';
import { TUser } from '../../types/index.js';

export interface UserDocument extends TUser, Document {
  createdAt: Date,
  updatedAt: Date,
}

const userSchema = new Schema({//доделать
  email: {
    type: String,
    unique: true,
    required: true,
  },
  avatarPath: {
    type: String,
    required: true,
    minlength: [2, 'Min length path is 5']
  },
  firstname: {
    type: String,
    required: true,
    minlength: [2, 'Min length first name is 2']
  },
  lastname: {
    type: String,
    required: true,
    minlength: [2, 'Min length last name is 1']
  },
}, {timestamps: true});

export const UserModel = model<UserDocument>('User',userSchema);
