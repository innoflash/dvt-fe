import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { ArtistsHelper } from '../../../testing/artists-helper';
import { TracksHelper } from '../../../testing/tracks-helper';
import { ArtistModel } from '../../shared/models/artist.model';

import { ArtistsService } from './artists.service';

describe('ArtistsService', () => {
  let service: ArtistsService;
  let httpTestingController: HttpTestingController;
  let artistsHelper: ArtistsHelper;
  let tracksHelper: TracksHelper;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ArtistsService);
    httpTestingController = TestBed.inject(HttpTestingController);
    artistsHelper = new ArtistsHelper();
    tracksHelper = new TracksHelper();
  });

  it('should be created', () => expect(service).toBeTruthy());

  it('should get artist details', function () {
    service.getArtistDetails(1)
      .subscribe({
        next: artist => {
          expect(artist).toBeTruthy();
          expect(artist).toEqual(artistsHelper.artist as ArtistModel);
        },
        error: err => console.log(err)
      });

    const req = httpTestingController.expectOne('api/artist/1');
    expect(req.request.method).toBe('GET');

    req.flush(artistsHelper.generateArtist(1));
  });

  it('should search for artists', fakeAsync(() => {
    service.findArtists('searchTerm')
      .subscribe({
        next: artists => {
          expect(artists).toBeTruthy();
          expect(artists.length).toBe(10);
        }
      });

    const req = httpTestingController.expectOne('api/search?q=artist:"searchTerm"');
    expect(req.request.method).toBe('GET');
    pending('No idea how to handle subsequent http calls.');
    req.flush({
      data: tracksHelper.generateTracks(10)
    });
  }));

  afterEach(() => httpTestingController.verify());
});
