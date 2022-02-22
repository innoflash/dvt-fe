import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trackDuration'
})
export class TrackDurationPipe implements PipeTransform {

  transform(duration: number, ...args: unknown[]): string {
    const minutes = Math.floor(duration / 60).toString().padStart(2, '0');
    const seconds = (duration % 60).toString().padStart(2, '0');

    return `${ minutes }:${ seconds }`;
  }

}
