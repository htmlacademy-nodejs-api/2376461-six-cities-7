import type { TCoordsTuple } from './coords.type.js';
import type { Comfort, Housing, City } from '../enums/index.js';

export type TServerData = {
  titles: string[];
  descriptions: string[];
  cities: City[];
  previews: string[];
  photos: string[];
  housings: Housing[];
  comforts: Comfort[];
  names: string[];
  emails: string[];
  avatars: string[];
  passwords: string[];
  coords: TCoordsTuple[];
};
