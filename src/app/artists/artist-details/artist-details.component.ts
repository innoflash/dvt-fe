import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistsService } from '../services/artists.service';

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.scss']
})
export class ArtistDetailsComponent implements OnInit {
  public isLoading = false;
  private artistId!: number;

  constructor(
    private route: ActivatedRoute,
    private artistsService: ArtistsService
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

  private loadArtistDetails(): void {
    this.artistsService.getArtistDetails(this.artistId).subscribe();
  }
}
