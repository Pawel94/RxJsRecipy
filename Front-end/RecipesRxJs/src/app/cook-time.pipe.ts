import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cookTime',
})
export class CookTimePipe implements PipeTransform {
  transform(value: number | undefined, ...args: unknown[]): unknown {
    if (value === 0 || value === undefined)
      return 'Somebody forget to set cooking time :(';
    let hours = Math.round(value / 60);
    if (hours > 1) {
      value = Math.round(value - 60 * hours);
      return `${hours}h ${value}min`;
    }
    return `${value} min`;
  }
}
