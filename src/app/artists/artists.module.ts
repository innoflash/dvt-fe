import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ArtistDetailsComponent } from './artist-details/artist-details.component';
import { ArtistsListComponent } from './artists-list/artists-list.component';

import { ArtistsRoutingModule } from './artists-routing.module';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    NavbarComponent,
    ArtistsListComponent,
    ArtistDetailsComponent
  ],
  imports: [
    CommonModule,
    ArtistsRoutingModule,
    ReactiveFormsModule
  ]
})
export class ArtistsModule {}
