import { faker } from '@faker-js/faker';
import { ArtistModel } from '../app/shared/models/artist.model';
import { TrackModel } from '../app/shared/models/track.model';
import { ArtistsHelper } from './artists-helper';

export class TracksHelper {
  public track?: Partial<TrackModel>;
  public tracks?: Partial<TrackModel>[];
  public artistHelper!: ArtistsHelper;

  constructor() {
    this.artistHelper = new ArtistsHelper();
  }

  /**
   * Generates a track for the given artist.
   * @param artistId The id of the artist.
   * @returns The track details.
   */
  public generateTrack(artistId: number): Partial<TrackModel> {
    this.track = {
      id: faker.datatype.number(),
      title: faker.lorem.words(),
      duration: faker.datatype.number(480),
      artist: this.artistHelper.generateArtist(artistId) as ArtistModel
    };
    return this.track!;
  }

  /**
   * Generates tracks for an artist.
   *
   * @param numOfTracks Number of tracks
   * @param artistId The id of the artist.
   * @returns The tracks for the artist.
   */
  public generateTracks(numOfTracks: number, artistId?: number): Partial<TrackModel>[] {
    this.tracks = [];
    for (let i = 0; i < numOfTracks; i++) {
      this.tracks.push(this.generateTrack(artistId || i++));
    }
    return this.tracks!;
  }
}
