import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistDetailsComponent } from './artist-details/artist-details.component';
import { ArtistsListComponent } from './artists-list/artists-list.component';

const routes: Routes = [
  {
    path: '',
    component: ArtistsListComponent
  },
  {
    path: ':id',
    component: ArtistDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtistsRoutingModule {}
