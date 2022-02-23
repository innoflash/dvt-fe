import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { BaseHttpService } from './base-http.service';

describe('BaseHttpService', () => {
  let service: TestBaseHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        TestBaseHttpService
      ]
    });
    service = TestBed.inject(TestBaseHttpService);
  });

  it('should be created', () => expect(service).toBeTruthy());

  it('should append /api to the given route.', () => expect(service.url).toBe('api/url'));
});

@Injectable()
class TestBaseHttpService extends BaseHttpService {
  public url = this.resolveUrl('/url');
}
