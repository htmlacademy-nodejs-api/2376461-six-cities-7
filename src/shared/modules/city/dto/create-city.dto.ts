import { City } from '../../../enums/city.enum.js';
import { TCoords } from '../../../types/index.js';

export class CreateCityDTO {
  public name: City;
  public location: TCoords;
}
