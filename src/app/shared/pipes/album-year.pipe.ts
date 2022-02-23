import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'albumYear'
})
export class AlbumYearPipe implements PipeTransform {

  transform(releaseDate: string, ...args: unknown[]): string {
    return releaseDate.split('-')[0];
  }
}
