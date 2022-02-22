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
   * @param url The path to make the http request to.
   * @returns The sanitized path.
   */

  protected resolveUrl(url: string): string {
    if (!environment.production) {
      return `api${ url }`;
    }
    return url;
  }
}
