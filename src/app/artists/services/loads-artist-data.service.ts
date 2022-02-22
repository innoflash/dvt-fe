import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseHttpService } from '../../shared/services/base-http.service';

@Injectable({
  providedIn: 'root'
})
export abstract class LoadsArtistDataService<T> extends BaseHttpService {
  protected abstract resource: string;

  /**
   * Fetches the data for the given resource for the given artist.
   *
   * @param {number} artistId
   * @returns {Observable<T[]>}
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
}
