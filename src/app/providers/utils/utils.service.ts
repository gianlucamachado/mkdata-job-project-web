import { Injectable } from '@angular/core';
import { OPTIONS, DATASETS } from './chart-options.constant';

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
  getLastSevenMonths(): string[] {
    // get date
    const today = new Date();

    // months labels
    const labels: string[] = [];

    // months of the year
    const monthsOfTheYear: string[] = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    // get month index
    let month: number = today.getMonth();

    while (labels.length < 7) {

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

}
