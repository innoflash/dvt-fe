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

    if (fans < 1000) {
      return `${ fans } fans`;
    }

    if (fans < 1000000) {
      return this.roundUpFanCount(fans, 1000, 'k', 'M');
    }

    if (fans < 1000000000) {
      return this.roundUpFanCount(fans, 1000000, 'M', 'B');
    }

    return `${ Math.round(fans / 1000000000) }B fans`;
  }

  private roundUpFanCount(fans: number, divident: number, fanSymbol: string, nextFanSymbol: string): string {
    const fanCount = Math.round(fans / divident);

    if (fanCount % 10 !== 0) {
      return `${ fanCount }${ fanSymbol } fans`;
    }

    return `1${ nextFanSymbol } fans`;
  }

}
