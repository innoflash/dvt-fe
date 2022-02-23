import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AlbumsHelper } from '../../../testing/albums-helper';

import { AlbumsService } from './albums.service';

describe('AlbumsService', () => {
  let service: AlbumsService;
  let httpTestingController: HttpTestingController;
  let albumsHelper: AlbumsHelper;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(AlbumsService);
    httpTestingController = TestBed.inject(HttpTestingController);
    albumsHelper = new AlbumsHelper();
  });

  it('should be created', () => expect(service).toBeTruthy());

  it('should get artist albums', () => {
    service.getData(1).subscribe({
      next: res => {
        expect(res).toBeTruthy('No albums found!');
        expect(res.length).toBe(5, "incorrect number of albums");
      },
      error: err => console.log(err)
    });

    const req = httpTestingController.expectOne('api/artist/1/albums');
    expect(req.request.method).toBe('GET');

    req.flush({
      data: albumsHelper.generateAlbums()
    });
    httpTestingController.verify();
  });
});
