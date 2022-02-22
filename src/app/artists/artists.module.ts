import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
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
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ArtistsModule {}
