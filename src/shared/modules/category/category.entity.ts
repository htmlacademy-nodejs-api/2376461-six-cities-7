import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';

import { TCategory } from '../../types/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CategoryEntity extends defaultClasses.Base{}

@modelOptions({
  schemaOptions: {
    collection: 'categories',
    timestamps: true,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CategoryEntity extends defaultClasses.TimeStamps implements TCategory {
  @prop({required: true, trim: true})
  public name!: string;
}

export const CategoryModel = getModelForClass(CategoryEntity);
