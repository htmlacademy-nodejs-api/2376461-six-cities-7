import dayjs from 'dayjs';
import {
  generateRandomValue,
  getRandomItem,
  getRandomItems
} from '../../Utilities/index.js';
import { UserType } from '../../enums/user-type.enum.js';
import {
  MIN_PRICE,
  MIN_GUEST_QUANTITY,
  MIN_RATING,
  MIN_ROOM_QUANTITY,
  MAX_GUEST_QUANTITY,
  MAX_PRICE,
  MAX_RATING,
  MAX_ROOM_QUANTITY,
  FIRST_WEEK_DAY,
  LAST_WEEK_DAY
} from './offer-generator-constants.js';

import type { TServerData } from '../../types/index.js';
import type { IOfferGenerator } from './offer-generator.interface.js';

export class TSVOfferGenerator implements IOfferGenerator {
  constructor(private readonly mockData: TServerData) {}

  generate(): string {
    const title = getRandomItem(this.mockData.titles);
    const description = getRandomItem(this.mockData.descriptions);
    const city = getRandomItem(this.mockData.cities);
    const preview = getRandomItem(this.mockData.previews);
    const photos = getRandomItems(this.mockData.photos).join(';');
    const isPremium = getRandomItem(['true', 'false']);
    const isFavorite = getRandomItem(['true', 'false']);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING).toString();
    const housing = getRandomItem(this.mockData.housings);
    const roomQuantity = generateRandomValue(
      MIN_ROOM_QUANTITY,
      MAX_ROOM_QUANTITY
    ).toString();
    const guestQuantity = generateRandomValue(
      MIN_GUEST_QUANTITY,
      MAX_GUEST_QUANTITY
    ).toString();
    const rentCost = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const comfort = getRandomItems(this.mockData.comforts).join(';');
    const firstname = getRandomItem(this.mockData.firstname);
    const lastname = getRandomItem(this.mockData.lastname);
    const userEmail = getRandomItem(this.mockData.emails);
    const userAvatar = getRandomItem(this.mockData.avatars);
    const userPassword = getRandomItem(this.mockData.passwords);
    const userType = getRandomItem([UserType.Pro, UserType.Base]);
    const latlon = getRandomItem(this.mockData.coords).join(';');
    const postDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    return [
      title,
      description,
      postDate,
      city,
      preview,
      photos,
      isPremium,
      isFavorite,
      rating,
      housing,
      roomQuantity,
      guestQuantity,
      rentCost,
      comfort,
      firstname,
      lastname,
      userEmail,
      userAvatar,
      userPassword,
      userType,
      latlon
    ].join('\t');
  }
}
