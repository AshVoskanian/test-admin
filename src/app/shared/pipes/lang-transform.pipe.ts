import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'languageFormat',
  standalone: true
})
export class LanguageFormatPipe implements PipeTransform {
  transform(lang: string): string {
    switch (lang) {
      case 'en-uk':
        return 'En(Uk)';
      case 'en-us':
        return 'En(Us)';
      case 'fr':
        return 'Fr';
      case 'es':
        return 'Es';
      default:
        return lang; // Fallback for unknown language codes
    }
  }
}
