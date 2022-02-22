import { Injectable } from '@angular/core';
import { TrackModel } from '../../shared/models/track.model';
import { LoadsArtistDataService } from './loads-artist-data.service';

@Injectable({
  providedIn: 'root'
})
export class TracksService extends LoadsArtistDataService<TrackModel> {
  protected resource = 'top';
}
