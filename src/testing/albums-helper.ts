import { faker } from '@faker-js/faker';
import { AlbumModel } from '../app/shared/models/album.model';

export class AlbumsHelper {
  public album?: Partial<AlbumModel>;
  public albums?: Partial<AlbumModel>[];

  /**
   * Generate an album.
   * @returns The album details.
   */
  public generateAlbum(): Partial<AlbumModel> {
    this.album = {
      id: faker.datatype.number(),
      title: faker.lorem.words(),
      release_date: faker.datatype.datetime().toString(),
      cover_big: faker.image.imageUrl()
    };

    return this.album!;
  }

  /**
   * Generates albums.
   * @param numOfAlbums Number of albums to generate.
   * @returns The generated albums.
   */
  public generateAlbums(numOfAlbums: number = 5): Partial<AlbumModel>[] {
    this.albums = [];
    for (let i = 0; i < numOfAlbums; i++) {
      this.albums.push(this.generateAlbum());
    }
    return this.albums!;
  }
}
