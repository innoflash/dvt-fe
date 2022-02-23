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
      picture: faker.image.imageUrl(),
      picture_small: faker.image.imageUrl(),
      picture_medium: faker.image.imageUrl(),
      picture_xl: faker.image.imageUrl(),
      nb_album: faker.datatype.number(),
      nb_fan: faker.datatype.number()
    };
    return this.artist!;
  }
}
