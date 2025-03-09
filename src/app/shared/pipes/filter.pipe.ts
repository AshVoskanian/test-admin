import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {
  transform(value: any, operator: 'equal' | '!equal', toCompareField: any, comparableParameter: any): any {
    if (operator === 'equal') {
      return value.filter((val: any) => val[toCompareField] === comparableParameter);
    }

    if (operator === '!equal') {
      return value.filter((val: any) => val[toCompareField] !== comparableParameter);
    }

    return null;
  }

}
