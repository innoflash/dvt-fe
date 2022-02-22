import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistFanCountPipe } from './pipes/artist-fan-count.pipe';
import { TrackDurationPipe } from './pipes/track-duration.pipe';
import { AlbumYearPipe } from './pipes/album-year.pipe';



@NgModule({
  declarations: [
    ArtistFanCountPipe,
    TrackDurationPipe,
    TrackDurationPipe,
    AlbumYearPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ArtistFanCountPipe,
    TrackDurationPipe,
    AlbumYearPipe
  ]
})
export class SharedModule { }
