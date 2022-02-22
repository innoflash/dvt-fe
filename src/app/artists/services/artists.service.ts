import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ArtistModel } from '../../shared/models/artist.model';
import { SongModel } from '../../shared/models/song.model';

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {

  constructor(private http: HttpClient) {
  }

  /**
   * Searches artists from the Deezer API.
   *
   * @param {string} searchTerm
   * @returns {Observable<ArtistModel[]>}
   */
  public findArtists(searchTerm: string = ''): Observable<ArtistModel[]> {
    return this.http.get<SongsResponse>(this.resolveUrl(`/search?q=artist:"${ encodeURI(searchTerm) }"`))
      .pipe(
        map(res => {
          const artists = res.data.map(song => song.artist);

          const uniqueArtists: ArtistModel[] = [];

          artists.forEach(artist => {
            const uniqueArtistsArtist = uniqueArtists.find(a => a.id === artist.id);
            if (!uniqueArtistsArtist) {
              uniqueArtists.push(artist);
            }
          });

          return uniqueArtists;
        })
      );
  }

  /**
   * Adds root API to the given url.
   * @param {string} url
   * @returns {string}
   */
  private resolveUrl(url: string): string {
    if (!environment.production) {
      return `api${ url }`;
    }
    return url;
  }
}

type SongsResponse = {
  data: SongModel[]
};
