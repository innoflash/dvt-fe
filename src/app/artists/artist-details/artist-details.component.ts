import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AlbumModel } from '../../shared/models/album.model';
import { ArtistModel } from '../../shared/models/artist.model';
import { TrackModel } from '../../shared/models/track.model';
import { AlbumsService } from '../services/albums.service';
import { ArtistsService } from '../services/artists.service';
import { TracksService } from '../services/tracks.service';

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.scss']
})
export class ArtistDetailsComponent implements OnInit {
  private artistId!: number;
  public isLoading = false;
  public artist?: ArtistModel;
  public tracks: TrackModel[] = [];
  public albums: AlbumModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private artistsService: ArtistsService,
    private tracksService: TracksService,
    private albumsService: AlbumsService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: res => {
        this.artistId = res.id;
        this.loadArtistDetails();
      }
    });
  }

  /**
   * Loads the required artist details.
   */
  private loadArtistDetails(): void {
    this.isLoading = true;

    this.resetValues();

    forkJoin([
      this.artistsService.getArtistDetails(this.artistId),
      this.tracksService.getData(this.artistId),
      this.albumsService.getData(this.artistId)
    ])
      .subscribe({
        next: ([artist, tracks, albums]) => {
          this.artist = artist;
          this.tracks = tracks;
          this.albums = albums;
        },
        error: err => alert(err.message),
        complete: () => this.isLoading = false
      });
  }

  /**
   * Resets the values in preparation for a re-render.
   */
  private resetValues(): void {
    this.artist = undefined;
    this.tracks = [];
    this.albums = [];
  }
}
