import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { createSHA256 } from '../../Utilities/index.js';

import { UserType } from '../../enums/user-type.enum.js';
import { TUser } from '../../types/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements TUser {

  @prop({ unique: true, required: true })
  public email: string;

  @prop({ required: false, default: '' })
  public avatarPath: string | undefined;

  @prop({ required: true })
  public firstname: string;

  @prop({ required: true })
  public lastname: string;

  @prop({ type: () => String, enum: UserType })
  public type!: UserType;

  @prop({ required: true, default: '' })
  public password?: string;

  constructor(userData: TUser){
    super();

    this.email = userData.email;
    this.avatarPath = userData.avatarPath;
    this.firstname = userData.firstname;
    this.lastname = userData.lastname;
    this.type = userData.type;
  }

  public setPassword(password: string, salt: string){
    this.password = createSHA256(password,salt);
  }

  public getPassword(){
    return this.password;
  }

}

export const UserModel = getModelForClass(UserEntity);
