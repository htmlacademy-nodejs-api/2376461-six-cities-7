import { inject, injectable } from 'inversify';
import { CategoryService } from './category-service.interface.js';
import { CategoryEntity } from './category.entity.js';
import { CreateCategoryDto } from './dto/create-categoty.dto.js';
import { Component } from '../../enums/component.enum.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';

@injectable()
export class DefaultCategoryService implements CategoryService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.CategoryModel) private readonly categoryModel: types.ModelType<CategoryEntity>,
  ){}

  public async create(dto: CreateCategoryDto): Promise<DocumentType<CategoryEntity>> {
    const result = await this.categoryModel.create(dto);
    this.logger.info(`New category created: ${dto.name}`);
    return result;
  }

  public async findByCategoryId (categoryId: string): Promise<DocumentType<CategoryEntity> | null> {
    return await this.categoryModel.findById(categoryId).exec();
  }

  public async findByCategoryName(categoryName: string): Promise<DocumentType<CategoryEntity> | null> {
    return await this.categoryModel.findOne({name: categoryName}).exec();
  }

  public async findByCategoryNameOrCreate(categoryName: string, dto: CreateCategoryDto): Promise<DocumentType<CategoryEntity>> {
    const existedCategory = await this.findByCategoryName(categoryName);

    if(existedCategory){
      return existedCategory;
    }

    return this.create(dto);
  }

}

