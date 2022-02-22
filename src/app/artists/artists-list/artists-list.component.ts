import { Component, OnInit } from '@angular/core';
import { ArtistModel } from '../../models/artist.model';
import { ArtistsService } from '../services/artists.service';

@Component({
  selector: 'app-artists-list',
  templateUrl: './artists-list.component.html',
  styleUrls: ['./artists-list.component.scss']
})
export class ArtistsListComponent implements OnInit {
  public searchTerm = '';
  public artists: ArtistModel[] = [];

  constructor(private artistsService: ArtistsService) {
  }

  ngOnInit(): void {
  }

  public findArtists(searchTerm: string = '') {
    this.searchTerm = searchTerm;

    console.log({ searchTerm });
    this.artistsService.findArtists(searchTerm)
      .subscribe({
        next: res => this.artists = res,
        error: err => alert(err.message)
      });
  }
}
