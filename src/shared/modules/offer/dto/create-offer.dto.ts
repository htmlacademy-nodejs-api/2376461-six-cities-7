import { TCoords } from '../../../types/index.js';
import { Comfort } from '../../../enums/comfort.enum.js';
import { Housing } from '../../../enums/housing.enum.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public postDate: Date;
  public cityId: string;
  public previewImage: string;
  public photos: string[];
  public isPremium: boolean;
  public isFavorite: boolean;
  public rating: number;
  public type: Housing;
  public bedrooms: number;
  public maxAdults: number;
  public price: number;
  public comfort: Comfort[];
  public location: TCoords;
  public userId: string;
}
