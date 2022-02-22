import { Component, OnInit } from '@angular/core';
import { ArtistModel } from '../../shared/models/artist.model';
import { ArtistsService } from '../services/artists.service';

@Component({
  selector: 'app-artists-list',
  templateUrl: './artists-list.component.html',
  styleUrls: ['./artists-list.component.scss']
})
export class ArtistsListComponent implements OnInit {
  public searchTerm = '';
  public isLoading = false;
  public artists: ArtistModel[] = [];

  constructor(private artistsService: ArtistsService) {
  }

  ngOnInit(): void {
    this.findArtists();
  }

  /**
   * Searches the Deezer API for some artists.
   * @param searchTerm the term to find on the server.
   */
  public findArtists(searchTerm: string = ''): void {
    this.searchTerm = searchTerm;
    this.isLoading = true;
    this.artists = [];

    this.artistsService.findArtists(searchTerm)
      .subscribe({
        next: res => this.artists = res,
        error: err => alert(err.message),
        complete: () => this.isLoading = false
      });
  }
}
