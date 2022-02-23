import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AlbumsHelper } from '../../../testing/albums-helper';
import { ArtistsHelper } from '../../../testing/artists-helper';
import { TracksHelper } from '../../../testing/tracks-helper';
import { AlbumModel } from '../../shared/models/album.model';
import { ArtistModel } from '../../shared/models/artist.model';
import { TrackModel } from '../../shared/models/track.model';
import { AlbumYearPipe } from '../../shared/pipes/album-year.pipe';
import { ArtistFanCountPipe } from '../../shared/pipes/artist-fan-count.pipe';
import { TrackDurationPipe } from '../../shared/pipes/track-duration.pipe';
import { SharedModule } from '../../shared/shared.module';
import { AlbumsService } from '../services/albums.service';
import { ArtistsService } from '../services/artists.service';
import { TracksService } from '../services/tracks.service';

import { ArtistDetailsComponent } from './artist-details.component';

describe('ArtistDetailsComponent', () => {
  let component: ArtistDetailsComponent;
  let fixture: ComponentFixture<ArtistDetailsComponent>;
  let debugElement: DebugElement;
  let artistsService: any;
  let tracksService: any;
  let albumsService: any;
  let artistsHelper: ArtistsHelper;

  beforeEach(async () => {
    artistsService = jasmine.createSpyObj('ArtistsService', ['getArtistDetails']);
    tracksService = jasmine.createSpyObj('TracksService', ['getData']);
    albumsService = jasmine.createSpyObj('AlbumsService', ['getData']);

    await TestBed.configureTestingModule({
      declarations: [ArtistDetailsComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        SharedModule
      ],
      providers: [
        {
          provide: ArtistsService,
          useValue: artistsService
        },
        {
          provide: TracksService,
          useValue: tracksService
        },
        {
          provide: AlbumsService,
          useValue: albumsService
        }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ArtistDetailsComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        artistsHelper = new ArtistsHelper();

        fixture.detectChanges();
      });
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should show loading when the profile is not loaded yet', () => {
    component.isLoading = true;
    fixture.detectChanges();
    const img = debugElement.query(By.css('img'));
    expect(img).toBeTruthy();
  });

  describe('Show artist details', () => {
    beforeEach(() => {
      component.isLoading = false;
      component.artist = artistsHelper.generateArtist(1) as ArtistModel;

      fixture.detectChanges();
    });

    it('should hide the loading spinner', () => {
      const img = debugElement.query(By.css('img .img-fluid'));
      expect(img).toBeFalsy();
    });

    it('should show artist`s picture', () => {
      const img = debugElement.query(By.css('img'));
      expect(img).toBeTruthy();
      expect(img.attributes.src).toBeTruthy();
    });

    it('should show artist`s name', () => {
      const nameH1 = debugElement.query(By.css('.row h1'));
      expect(nameH1).toBeTruthy();
      expect(nameH1.nativeElement.textContent).toBe(artistsHelper.artist?.name);
    });

    it('should show artist`s fan count', () => {
      const fanCountH5 = debugElement.query(By.css('.row h5'));
      expect(fanCountH5).toBeTruthy();
      expect(fanCountH5.nativeElement.textContent).toBe(
        new ArtistFanCountPipe().transform(
          artistsHelper.artist?.nb_fan
        )
      );
    });
  });

  describe('Show artist tracks', () => {
    let tracksHelper: TracksHelper;
    let tracksList: DebugElement[];
    let trackElement: DebugElement;

    beforeEach(() => {
      tracksHelper = new TracksHelper();
      component.artist = artistsHelper.generateArtist(1) as ArtistModel;
      component.tracks = tracksHelper.generateTracks(5, 1)
        .map(track => track as TrackModel);
      fixture.detectChanges();

      tracksList = debugElement.queryAll(By.css('ul > li'));
      trackElement = tracksList[0];
    });

    it('should show 5 tracks', () => {
      expect(tracksList).toBeTruthy();
      expect(tracksList.length).toBe(5);
    });

    it('should show track name and number', () => {
      const nameSpan = trackElement.query(By.css('span'));
      expect(nameSpan).toBeTruthy();
      expect(nameSpan.nativeElement.textContent).toContain('1.');
      expect(nameSpan.query(By.css('span')).nativeElement.textContent)
        .toContain(tracksHelper.tracks![0].title_short);
    });

    it('should show the track time', () => {
      const timeSpan = trackElement.query(By.css('.badge'));
      expect(timeSpan).toBeTruthy();
      expect(timeSpan.nativeElement.textContent).toBe(
        new TrackDurationPipe().transform(tracksHelper.tracks![0].duration as number)
      );
    });
  });

  describe('Show artist albums', () => {
    let albumsHelper: AlbumsHelper;
    let albumsList: DebugElement[];
    let albumElement: DebugElement;

    beforeEach(() => {
      albumsHelper = new AlbumsHelper();
      component.artist = artistsHelper.generateArtist(1) as ArtistModel;
      component.albums = albumsHelper.generateAlbums(5)
        .map(album => album as AlbumModel);
      fixture.detectChanges();

      albumsList = debugElement.queryAll(By.css('.albums .card'));
      albumElement = albumsList[0];
    });

    it('should show 5 albums', () => {
      expect(albumsList).toBeTruthy();
      expect(albumsList.length).toBe(5);
    });

    it('should show an album cover', () => {
      expect(albumElement).toBeTruthy();
      const imgTag = albumElement.query(By.css('img'));
      expect(imgTag).toBeTruthy();
      expect(imgTag.attributes.src).toBe(albumsHelper.albums![0].cover_big as string);
    });

    it('should the album name', () => {
      const nameH5 = albumElement.query(By.css('h5'));
      expect(nameH5).toBeTruthy();
      expect(nameH5.nativeElement.textContent).toBe(albumsHelper.albums![0].title as string);
    });

    it('should show a transformed release year', () => {
      const yearPara = albumElement.query(By.css('p'));
      expect(yearPara).toBeTruthy();
      expect(yearPara.nativeElement.textContent).toBe(
        new AlbumYearPipe().transform(albumsHelper.albums![0].release_date as string)
      );
    });
  });
});
