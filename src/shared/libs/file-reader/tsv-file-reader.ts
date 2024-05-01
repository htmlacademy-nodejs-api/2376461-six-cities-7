import { readFileSync } from 'node:fs';

import type { TOffer, TCoords } from '../../types/index.js';
import type { City, Comfort, Housing, UserType } from '../../enums/index.js';
import type { IFileReader } from './file-reader.interface.js';

const getCoordsFromStr = (str: string): TCoords => {
  const [lat, lon] = str.split(';');

  return {
    lat: Number(lat),
    lon: Number(lon)
  };
};

export class TSVFileReader implements IFileReader {
  private rawData = '';

  constructor(private readonly filename: string) {}

  private validateRawData(): void {
    if (!this.rawData) {
      throw new Error('File was not read');
    }
  }

  private parseRawDataToOffers(): TOffer[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  private parseLineToOffer(line: string): TOffer {
    const [
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
      userName,
      userEmail,
      userAvatar,
      userPassword,
      userType,
      latlon
    ] = line.split('\t');

    return {
      title,
      description,
      postDate: new Date(postDate),
      city: city as City,
      preview,
      photos: photos.split(';'),
      isPremium: isPremium === 'true',
      isFavorite: isFavorite === 'true',
      rating: Number(rating),
      housing: housing as Housing,
      roomQuantity: Number(roomQuantity),
      guestQuantity: Number(guestQuantity),
      rentCost: Number(rentCost),
      comfort: comfort.split(';') as Comfort[],
      user: {
        name: userName,
        email: userEmail,
        avatar: userAvatar === 'null' ? null : userAvatar,
        password: userPassword,
        type: userType as UserType
      },
      coords: getCoordsFromStr(this.cutCRValue(latlon))
    };
  }

  cutCRValue(str: string) {
    return str.replace('\r', '');
  }

  read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  toArray(): TOffer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
