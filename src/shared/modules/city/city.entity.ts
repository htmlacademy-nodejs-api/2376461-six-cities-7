import { defaultClasses, getModelForClass, prop, modelOptions } from '@typegoose/typegoose';

import { TCoords } from '../../types/index.js';
import { City } from '../../enums/city.enum.js';
import { TCity } from '../../types/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CityEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'cities',
    timestamps: true
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CityEntity extends defaultClasses.TimeStamps implements TCity {
  @prop({ required: true, enum: City, default: '' })
  public name!: City;

  @prop({ required: true })
  public location!: TCoords;
}

export const CityModel = getModelForClass(CityEntity);
