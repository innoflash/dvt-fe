import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TracksHelper } from '../../../testing/tracks-helper';
import { TracksService } from './tracks.service';

describe('TracksService', () => {
  let service: TracksService;
  let httpTestingController: HttpTestingController;
  let tracksHelper: TracksHelper;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(TracksService);
    httpTestingController = TestBed.inject(HttpTestingController);
    tracksHelper = new TracksHelper();
  });

  it('should be created', () => expect(service).toBeTruthy());

  it('should get artist tracks', function () {
    service.getData(1).subscribe({
      next: res => {
        expect(res).toBeTruthy('No tracks found!');
        expect(res.length).toBe(5, "incorrect number of tracks");
        const artistMusic = res.filter(track => track.artist.id === 1);

        expect(artistMusic).toBeTruthy();
        expect(artistMusic.length).toBe(5);
      },
      error: err => console.log(err)
    });

    const req = httpTestingController.expectOne('api/artist/1/top');
    expect(req.request.method).toBe('GET');

    req.flush({
      data: tracksHelper.generateTracks(1, 5)
    });
    httpTestingController.verify();
  });
});
