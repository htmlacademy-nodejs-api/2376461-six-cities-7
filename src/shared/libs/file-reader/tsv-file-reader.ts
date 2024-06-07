import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';

import type { TCoords, TOffer } from '../../types/index.js';
import type { City, Comfort, Housing, UserType } from '../../enums/index.js';
import type { IFileReader } from './file-reader.interface.js';

const CHUNK_SIZE = 16384;

const getCoordsFromStr = (str: string): TCoords => {
  const [latit, longit] = str.split(';');
  console.log('getCoordsFromStr');
  console.log(str);
  return {
    latitude: Number(latit),
    longitude: Number(longit)
  };
};

export class TSVFileReader extends EventEmitter implements IFileReader {
  constructor(private readonly filename: string) {
    super();
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
      firstname,
      lastname,
      userEmail,
      userAvatar,
      userPassword,
      userType,
      latlon
    ] = line.split('\t');
    console.log('я line');
    console.log(line.split('\t'));
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
        firstname: firstname,
        lastname: lastname,
        email: userEmail,
        avatarPath: userAvatar === 'null' ? undefined : userAvatar,
        password: userPassword,
        type: userType as UserType,
      },
      coords: getCoordsFromStr(this.cutCRValue(latlon))
    };
  }

  cutCRValue(str: string) {
    console.log('я сработала');
    console.log(str);
    return str.replace('\r', '');
  }

  async read() {
    const readStream = createReadStream(this.filename, {
      highWaterMark: CHUNK_SIZE,
      encoding: 'utf-8'
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        const parsedOffer = this.parseLineToOffer(completeRow);

        await new Promise((resolve) => {
          this.emit('line', parsedOffer,resolve);
        });
      }
    }

    this.emit('end', importedRowCount);
  }
}
