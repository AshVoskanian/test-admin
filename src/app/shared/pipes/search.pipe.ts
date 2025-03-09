import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByKey',
  standalone: true
})
export class FilterByKeyPipe implements PipeTransform {

  transform(items: any[], keys: string[], value: string): any[] {
    if (!items || !keys || !value) {
      return items; // return original array if no filtering criteria
    }

    const searchValue = value.toLowerCase();  // Convert search value to lowercase once

    return items.filter(item =>
      keys.some(key => {
        const itemValue = item[key];
        return itemValue && itemValue.toString().toLowerCase().includes(searchValue);
      })
    );
  }

}
