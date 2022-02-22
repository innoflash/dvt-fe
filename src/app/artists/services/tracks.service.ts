import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TrackModel } from '../../shared/models/track.model';
import { BaseHttpService } from '../../shared/services/base-http.service';

@Injectable({
  providedIn: 'root'
})
export class TracksService extends BaseHttpService {

  /**
   * Retrieves tracks for the given artist.
   *
   * @param {number} artistId
   * @returns {Observable<TrackModel[]>}
   */
  public getTopTracks(artistId: number): Observable<TrackModel[]> {
    return this.http.get<TracksResponse>(this.resolveUrl(`/artist/${ artistId }/top`))
      .pipe(map(res => res.data));
  }
}

type TracksResponse = {
  data: TrackModel[];
  total: number;
  next: string;
}
