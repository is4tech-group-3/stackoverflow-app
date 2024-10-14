import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(value: any, format: string = 'default'): string {
    if (!value) return '';

    const date = new Date(value);

    // Formato personalizado: 10 FEB 2023
    if (format === 'FORMAT-1') {
      const day = date.getDate().toString().padStart(2, '0');
      const month = date
        .toLocaleString('default', { month: 'short' })
        .toUpperCase();
      const year = date.getFullYear();
      return `${day} ${month} ${year}`;
    }

    // Formato por defecto
    return date.toLocaleString();
  }
}
