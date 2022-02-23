import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ArtistsHelper } from '../../../testing/artists-helper';
import { ArtistModel } from '../../shared/models/artist.model';
import { ArtistFanCountPipe } from '../../shared/pipes/artist-fan-count.pipe';
import { SharedModule } from '../../shared/shared.module';
import { ArtistsService } from '../services/artists.service';

import { ArtistsListComponent } from './artists-list.component';

fdescribe('ArtistsListComponent', () => {
  let component: ArtistsListComponent;
  let fixture: ComponentFixture<ArtistsListComponent>;
  let debugElement: DebugElement;
  let artistsService: any;
  let artistsHelper: ArtistsHelper;

  beforeEach(async () => {
    artistsService = jasmine.createSpyObj('ArtistsService', ['findArtists']);
    artistsService.findArtists.and.returnValue(of({
      data: []
    }));
    await TestBed.configureTestingModule({
      declarations: [ArtistsListComponent],
      imports: [
        BrowserDynamicTestingModule,
        SharedModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: ArtistsService,
          useValue: artistsService
        }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ArtistsListComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        fixture.detectChanges();
      });
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should show loading when data is still pending', () => {
    component.isLoading = true;
    fixture.detectChanges();
    const img = debugElement.query(By.css('img'));
    expect(img).toBeTruthy();
  });

  it('should show results not found if none are found', () => {
    component.searchTerm = 'test';
    fixture.detectChanges();

    const alertDiv = debugElement.query(By.css('div .alert'));

    expect(alertDiv).toBeTruthy();
    expect(alertDiv.nativeElement.textContent).toBe(' No artists found for the the term "test" ');
  });

  describe('Showing of artists', () => {
    beforeEach(() => artistsHelper = new ArtistsHelper());

    it('should hide loading and error when artists are found', function () {
      component.artists = [artistsHelper.generateArtist(1) as ArtistModel];
      fixture.detectChanges();

      const loadingImg = debugElement.query(By.css('img .img-fluid'));
      const alertDiv = debugElement.query(By.css('div .alert'));

      expect(loadingImg).toBeFalsy('Loading is still on the screen');
      expect(alertDiv).toBeFalsy('Error screen is showing');
    });

    describe('Show one artist on card', () => {
      let artistAnchors: DebugElement[];
      let artistCard: DebugElement;
      beforeEach(() => {
        component.artists = [artistsHelper.generateArtist(1) as ArtistModel];
        fixture.detectChanges();

        artistAnchors = debugElement.queryAll(By.css('.row a'));
        artistCard = artistAnchors[0];
      });

      it('should show one artist', function () {
        expect(artistAnchors).toBeTruthy();
        expect(artistAnchors.length).toBe(1);
      });

      it('should show artist image', () => {
        const cardImg = artistCard.query(By.css('.card img'));
        expect(cardImg).toBeTruthy();
        expect(cardImg.attributes.src).toBe(artistsHelper.artist?.picture_medium!);
      });

      it('should show name on an h5', () => {
        const titleH5 = artistCard.query(By.css('.card .card-body h5'));
        expect(titleH5).toBeTruthy();
        expect(titleH5.nativeElement.textContent).toBe(artistsHelper.artist?.name);
      });

      it('should show artist fan count', () => {
        const fanCountPara = artistCard.query(By.css('.card .card-body p'));
        expect(fanCountPara).toBeTruthy();
        expect(fanCountPara.nativeElement.textContent).toBe(new ArtistFanCountPipe()
          .transform(artistsHelper.artist?.nb_fan));
      });

      it('should show artist`s number of albums', () => {
        const albumSpan = artistCard.query(By.css('.card .card-body span'));
        expect(albumSpan).toBeTruthy();
        expect(albumSpan.nativeElement.textContent).toContain(`${ artistsHelper.artist?.nb_album }`);
      });

      it('should navigate to the artist details page', () => {
        const router = TestBed.inject(Router);
        spyOn(router, 'navigateByUrl');
        artistCard.nativeElement.click();

        expect(router.navigateByUrl).toHaveBeenCalledOnceWith(router.createUrlTree(['/artists/1']), { skipLocationChange: false, replaceUrl: false, state: undefined });
      });
    });

    it('should show 10 artists on the screen', () => {
      component.artists = artistsHelper.generateArtists(10).map(artist => artist as ArtistModel);
      fixture.detectChanges();

      const artistAnchors = debugElement.queryAll(By.css('.row a'));
      expect(artistAnchors).toBeTruthy();
      expect(artistAnchors.length).toBe(10);
    });
  });

  it('should load artists from the server when page loads', () => {
    spyOn(component, 'findArtists');
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.findArtists).toHaveBeenCalledTimes(1);
  });
});
