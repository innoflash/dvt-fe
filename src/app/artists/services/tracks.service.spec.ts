import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TracksService } from './tracks.service';

fdescribe('TracksService', () => {
  let service: TracksService;
  let httpTestingController: HttpTestingController;
  let httpClientMock: any;

  beforeEach(() => {
    httpClientMock = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: HttpClient,
          useValue: httpClientMock
        }
      ]
    });
    service = TestBed.inject(TracksService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => expect(service).toBeTruthy());

  it('should calls the http service', () => {
    pending();
    // httpTestingController =
    service.getData(1).subscribe();
  });

  it('should get artist tracks', function () {
    pending('Working on testing other prts');
    service.getData(1).subscribe({
      next: res => {
        expect(res).toBeTruthy('No tracks found!');
      }
    });
  });
});
