import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validation'
})
export class ValidationPipe implements PipeTransform {

  transform(value: any, errorObj: any): string {
    return errorObj ? value[Object.keys(errorObj)[0]] : '';
  }

}
