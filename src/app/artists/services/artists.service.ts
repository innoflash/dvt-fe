import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ArtistModel } from '../../shared/models/artist.model';
import { TrackModel } from '../../shared/models/track.model';
import { BaseHttpService } from '../../shared/services/base-http.service';

@Injectable({
  providedIn: 'root'
})
export class ArtistsService extends BaseHttpService {

  /**
   * Searches artists from the Deezer API.
   *
   * @param searchTerm The term send to the server for querying.
   * @returns The artists pulled from the server.
   */
  public findArtists(searchTerm: string = ''): Observable<ArtistModel[]> {
    return this.http.get<SongsResponse>(this.resolveUrl(`/search?q=artist:"${ encodeURI(searchTerm) }"`))
      .pipe(
        map(res => {
          const artistsIds = res.data.map(song => song.artist.id);

          return artistsIds.filter((id, index, self) => self.indexOf(id) === index);
        }),
        switchMap(res => {
          const artistObservables = res.map(artistId => this.getArtistDetails(artistId));

          return forkJoin([...artistObservables]);
        })
      );
  }

  /**
   * Fetches the profile of a single artist.
   *
   * @param artistId The id of the artist.
   * @returns The details of the artist.
   */
  public getArtistDetails(artistId: number): Observable<ArtistModel> {
    return this.http.get<ArtistModel>(this.resolveUrl(`/artist/${ artistId }`));
  }
}

type SongsResponse = {
  data: TrackModel[]
};
