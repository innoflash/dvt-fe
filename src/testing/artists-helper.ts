import { faker } from '@faker-js/faker';
import { ArtistModel } from '../app/shared/models/artist.model';

export class ArtistsHelper {
  public artist?: Partial<ArtistModel>;

  /**
   * Creates an artist with the given id.
   *
   * @param artistId The id of the artist.
   * @returns The artist details.
   */
  public generateArtist(artistId: number): Partial<ArtistModel> {
    this.artist = {
      id: artistId,
      name: faker.name.firstName(),
      picture: faker.internet.url(),
      picture_small: faker.internet.url(),
      picture_medium: faker.internet.url(),
      picture_xl: faker.internet.url(),
      nb_album: faker.datatype.number(),
      nb_fan: faker.datatype.number()
    };
    return this.artist!;
  }
}
