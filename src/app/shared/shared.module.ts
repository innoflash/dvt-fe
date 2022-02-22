import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistFanCountPipe } from './pipes/artist-fan-count.pipe';



@NgModule({
  declarations: [
    ArtistFanCountPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ArtistFanCountPipe
  ]
})
export class SharedModule { }
