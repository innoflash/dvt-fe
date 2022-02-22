import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {

  constructor(protected http: HttpClient) {
  }

  /**
   * Adds root API to the given url.
   * @param {string} url
   * @returns {string}
   */

  protected resolveUrl(url: string): string {
    if (!environment.production) {
      return `api${ url }`;
    }
    return url;
  }
}
