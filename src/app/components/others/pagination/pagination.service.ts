import { Injectable } from '@angular/core';
import { ITEMS_PER_PAGE } from './pagination.constants';

/**
 * Pagination service functions
 */
@Injectable()
export class PaginationService {

  /**
   * @ignore
   */
  constructor() { }

  /**
   * Defines if a row is active or note by the index and current page.
   * @param index Index of data.
   */
  isCurrentPage(index: number, currentPage: number): boolean {
    // const max
    const max: number = currentPage * ITEMS_PER_PAGE;

    // const min
    const min: number = (currentPage * ITEMS_PER_PAGE) - (ITEMS_PER_PAGE + 1);

    // verify
    if (index < max && index > min) {
      return true;
    }

    return false;
  }

}
