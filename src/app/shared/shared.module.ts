import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistFanCountPipe } from './pipes/artist-fan-count.pipe';
import { TrackDurationPipe } from './pipes/track-duration.pipe';



@NgModule({
  declarations: [
    ArtistFanCountPipe,
    TrackDurationPipe,
    TrackDurationPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ArtistFanCountPipe,
    TrackDurationPipe
  ]
})
export class SharedModule { }
