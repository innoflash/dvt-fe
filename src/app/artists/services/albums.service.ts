import { Injectable } from '@angular/core';
import { AlbumModel } from '../../shared/models/album.model';
import { LoadsArtistDataService } from './loads-artist-data.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService extends LoadsArtistDataService<AlbumModel> {
  protected resource: string = 'albums';
}
