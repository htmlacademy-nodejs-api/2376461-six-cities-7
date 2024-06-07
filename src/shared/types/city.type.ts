import { TCoords } from './coords.type.js';
import { City } from '../enums/city.enum.js';

export type TCity = {
  name: City;
  location: TCoords;
};

