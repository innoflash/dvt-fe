import { faker } from '@faker-js/faker';
import { ArtistModel } from '../app/shared/models/artist.model';

export class ArtistsHelper {
  public artist?: Partial<ArtistModel>;
  public artists?: Partial<ArtistModel>[];

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

  /**
   * Generates artists.
   * @param numOfArtists Number of artists.
   * @returns The artists generated.
   */
  public generateArtists(numOfArtists: number): Partial<ArtistModel>[] {
    this.artists = [];
    for (let i = 0; i < numOfArtists; i++) {
      this.artists.push(this.generateArtist(i + 1));
    }
    return this.artists!;
  }
}
