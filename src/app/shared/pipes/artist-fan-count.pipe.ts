import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'artistFanCount'
})
export class ArtistFanCountPipe implements PipeTransform {

  transform(fans: number | undefined, ...args: unknown[]): string {
    if (!fans) {
      return 'No fans';
    }

    const fanCountAsString = fans.toString();

    if (fans === 1) {
      return '1 fan';
    }

    if (fanCountAsString.length < 4) {
      return `${ fans } fans`;
    }

    if (fanCountAsString.length < 7) {
      return `${ Math.round(fans / 1000) }k fans`;
    }

    if (fanCountAsString.length < 10) {
      return `${ Math.round(fans / 1000000) }M fans`;
    }
    return `${ Math.round(fans / 1000000000) }B fans`;
  }

}
