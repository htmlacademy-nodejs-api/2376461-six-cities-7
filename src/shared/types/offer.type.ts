import type { TUser } from './user.type.js';
import type { TCoords } from './coords.type.js';
import type { City, Housing, Comfort } from '../enums/index.js';

export type TOffer = {
  title: string;//10-100
  description: string;//20-1024
  postDate: Date;
  city: City;
  preview: string;//url
  photos: string[];//url (length 6)
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;//1-5
  housing: Housing;
  roomQuantity: number;//1-8
  guestQuantity: number;//1-10
  rentCost: number;//100-100k
  comfort: Comfort[];
  user: TUser;
  coords: TCoords;
};
