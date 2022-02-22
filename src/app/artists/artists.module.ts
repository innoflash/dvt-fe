import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ArtistsRoutingModule } from './artists-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { ArtistsListComponent } from './artists-list/artists-list.component';
import { ArtistDetailsComponent } from './artist-details/artist-details.component';


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
export class ArtistsModule { }
