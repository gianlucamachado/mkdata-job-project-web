import { Injectable } from '@angular/core';
import { OPTIONS, DATASETS } from './chart-options.constant';
import { environment } from '../../../environments/environment';

/**
 * Utils Provider
 *
 * Provides common methods to all ap.
 */
@Injectable()
export class UtilsService {

  /**
   * @ignore
   */
  constructor() { }

  /**
   * Show error trigger.
   * @param key Key of form.
   */
  showError(key: string, form: any, submitAttempt: boolean): boolean {
    // declare params
    const a = form.controls[key].errors;
    const b = form.controls[key].dirty;
    const c = form.controls[key].touched;
    const d = submitAttempt;

    // return
    return (a && (b || c || d));
  }

  /**
   * Get last seven months.
   */
  getLastSixMonths(): string[] {
    // get date
    const today = new Date();

    // months labels
    const labels: string[] = [];

    // months of the year
    const monthsOfTheYear: string[] = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    // get month index
    let month: number = today.getMonth();

    while (labels.length < 6) {

      // if is december month
      if (month === -1) month = 11;

      // append month
      labels.push(monthsOfTheYear[month--]);
    }

    // return labels
    return labels.reverse();
  }

  /**
   * Get chart options.
   */
  getChartOptions(): any {
    return OPTIONS;
  }

  /**
   * Get chart options.
   */
  getChartDatasets(): any {
    return DATASETS;
  }

  /**
   * Return to types of phone mask
   */
  changePhoneMask(phone: string): string {
    return (phone && phone.length === 10) ? '(00) 0000-00000' : '(00) 00000-0000';
  }

  /**
   * Verify link of photo
   */
  verifyLink(photo: string): string {

    if (photo && photo.indexOf('http') === -1) {
      return environment.images_url + photo;
    }

    return photo;
  }

  /**
   * normalize string
   * @param string String to be normalized
   * @returns Normalized string
   */
  stringNormalize(string: string): string {
    // Lowercase the string
    let normalizedString = string.toLowerCase();
    // Substitute any divisors for underscores
    normalizedString = normalizedString.split(' ').join('_');
    normalizedString = normalizedString.split('-').join('_');
    // Substitute special characters for normalized variants
    normalizedString = normalizedString.replace(new RegExp('\\s', 'g'), '');
    normalizedString = normalizedString.replace(new RegExp('[àáâãäå]', 'g'), 'a');
    normalizedString = normalizedString.replace(new RegExp('æ', 'g'), 'ae');
    normalizedString = normalizedString.replace(new RegExp('ç', 'g'), 'c');
    normalizedString = normalizedString.replace(new RegExp('[èéêë]', 'g'), 'e');
    normalizedString = normalizedString.replace(new RegExp('[ìíîï]', 'g'), 'i');
    normalizedString = normalizedString.replace(new RegExp('ñ', 'g'), 'n');
    normalizedString = normalizedString.replace(new RegExp('[òóôõö]', 'g'), 'o');
    normalizedString = normalizedString.replace(new RegExp('œ', 'g'), 'oe');
    normalizedString = normalizedString.replace(new RegExp('[ùúûü]', 'g'), 'u');
    normalizedString = normalizedString.replace(new RegExp('[ýÿ]', 'g'), 'y');
    normalizedString = normalizedString.replace(new RegExp('\\W', 'g'), '');
    return normalizedString;
  }

}
