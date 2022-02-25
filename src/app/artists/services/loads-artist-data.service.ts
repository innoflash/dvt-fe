import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseHttpService } from '../../shared/services/base-http.service';

@Injectable({
  providedIn: 'root'
})
export abstract class LoadsArtistDataService<T> extends BaseHttpService {
  protected abstract readonly resource: string;

  /**
   * Fetches the data for the given resource for the given artist.
   *
   * @param artistId The id of the artist.
   * @returns The data from of the artist.
   */
  public getData(artistId: number): Observable<T[]> {
    return this.http.get<DataResponse<T>>(this.resolveUrl(`/artist/${ artistId }/${ this.resource }`))
      .pipe(map(res => res.data));
  }
}

type DataResponse<T> = {
  data: T[];
  total: number;
  next: string;
};
