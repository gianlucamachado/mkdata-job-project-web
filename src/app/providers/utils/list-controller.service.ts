import { Injectable } from '@angular/core';

export interface Pagination {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  startPage: number;
  endPage: number;
  startIndex: number;
  endIndex: number;
  pages: number[];
}

interface State {
  pagerController: Pagination;
  currentPage: any;
}

@Injectable()
export class ListControllerService {

  /**
   * @ignore
   */
  constructor() { }

  /**
   * Search a value in list and do pagination with results.
   * Return a object with pagination and current page data.
   * @param searched sought value.
   * @param params list of parameters to be compared.
   * @param list list to search.
   */
  setSearch(searched: string, params: string[], list: any[]) {
    if (list) {
      // do search.
      const foundValuesList = this.doSearch(searched, params, list);
      // do pagination.
      return this.setPagination(1, foundValuesList);
    }

    return this.setPagination(1, []);
  }

  /**
   * Set Filters to list and apply pagination.
   * @param state state filter
   *  state.values -> array with {key, value} to be filtered.
   *  state.dates -> object with init_date and finish_date.
   * @param list list to search.
   */
  setFilters(state, list: any[], betweenKey?: string) {
    // case not exist values. like a clear filter.
    // do pagination
    if (!state) {
      return this.setPagination(1, list);
    }

    // Object to save list with all filters apply.
    const filtered = [];

    // do search by all parameter name.
    for (const value of state.values) {
      filtered.push(this.doSearch(value.value, [value.key], list));
    }

    // Look for date between dates values passed by filter.
    if (state.dates) {
      filtered.push(this.doSearchBetween(betweenKey, state.dates['init_date'], state.dates['finish_date'], list));
    }

    // merge the filtered array.
    const allListFiltered = Array.from(new Set([].concat(...filtered)));

    // Apply pagination
    return this.setPagination(1, allListFiltered);
  }

  /**
   * Do pagination.
   * @param page current page to pagination
   * @param allList list to do pagination.
   * @param sortingParam param to sort list.
   */
  setPagination(page: number, allList: any[], sortingParam?: string): State {
    // sort list
    if (sortingParam) {
      allList.sort((a, b) => a[sortingParam] - b[sortingParam]);
    }

    // get pager object.
    // object to control the pagination.
    const pager: Pagination = this.getPager(allList.length, page);
    // return values to control pagination in html and current page.
    return { pagerController: pager, currentPage: allList.slice(pager.startIndex, pager.endIndex + 1) };
  }

  /**
   * Look for value searched in list by params list.
   * @param searched sought value.
   * @param searchParameterNames list of parameters to be compared.
   * @param list list to search
   */
  private doSearch(searched: string, searchParameterNames: string[], list) {
    // Save the values filtered.
    const filtered = [];
    // do search by all parameter name selected.
    for (const parameterName of searchParameterNames) {
      filtered.push(list.filter((a: any) => a[parameterName].toLowerCase().includes(searched.toLowerCase()) ? a : null));
    }
    // merge the filtered array.
    return Array.from(new Set([].concat(...filtered)));
  }

  /**
   * Look for value between values searched in list by params list.
   * @param key key to compare.
   * @param left left value, less then key value.
   * @param right right value, more then key value
   * @param list list to search
   */
  private doSearchBetween(key, left, right, list) {
    // do search by all parameter name selected.
    return list.filter((a: any) => (left < a[key] && a[key] < right) ? a : null);
  }

  /**
   * calculate pagination pages.
   * @param totalItems
   * @param currentPage
   * @param pageSize
   */
  private getPager(totalItems: number, currentPage: number = 1, pageSize: number = 5): Pagination {
    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);

    // ensure current page isn't out of range
    if (currentPage < 1) {
      // tslint:disable:no-parameter-reassignment
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    // tslint:disable-next-line:one-variable-per-declaration
    let startPage: number, endPage: number;
    if (totalPages <= 6) {
      // less than 6 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 6 total pages so calculate start and end pages
      if (currentPage <= 4) {
        startPage = 1;
        endPage = 6;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 5;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    const pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
      totalItems,
      pageSize,
      currentPage,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages,
    };
  }

}
