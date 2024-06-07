import { DocumentType, types } from '@typegoose/typegoose';

import { UserService } from './user-service.inerface.js';
import { UserEntity,UserModel } from './user.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../enums/component.enum.js';
import { Logger } from '../../libs/logger/index.js';

@injectable()
export class DefaultUserService implements UserService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>,
  ){}

  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    const result = await UserModel.create(user);
    this.logger.info(`New User created: mail: ${user.email} | name: ${user.firstname} ${user.lastname}`);

    return result;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    const result = await this.userModel.findOne({ email });
    return result;
  }

  public async findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.email);

    if (existedUser){
      return existedUser;
    }

    return this.create(dto,salt);
  }

}
