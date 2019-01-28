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
  allListFiltered?: any[];
  allListSearched?: any[];
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
  setSearch(searched: string, params: any[], list: any[]) {
    if (list) {

      // Case exist list, but search value is empty.
      if (!searched || searched === '') {
        return { ...this.setPagination(1, list), allListSearched: null };
      }

      // do search.
      const allListSearched = this.doSearch(this.removeAccents(searched), params, list);

      // do pagination.
      return { ...this.setPagination(1, allListSearched), allListSearched };
    }

    return { ...this.setPagination(1, list), allListSearched: null };
  }

  /**
   * Set Filters to list and apply pagination.
   * @param filterValues filter value.
   *  filterValues.values -> array with {key, value} to be filtered.
   *  filterValues.dates -> object with init_date and finish_date.
   * @param list list to search.
   */
  setFilters(filterValues, list: any[], betweenKey?: string) {
    // case not exist values. like a clear filter.
    // do pagination
    if (!filterValues) {
      return { ...this.setPagination(1, list), allListFiltered: null };
    }

    // Object to save list with all filters apply.
    const filtered = [];

    // do search by all parameter name.
    for (const value of filterValues.values) {
      filtered.push(this.doSearch(value.value, [value.key], list));
    }

    // Look for date between dates values passed by filter.
    if (filterValues.dates) {
      filtered.push(this.doSearchBetween(betweenKey, filterValues.dates['init_date'], filterValues.dates['finish_date'], list));
    }

    // merge the filtered array.
    const allListFiltered = Array.from(new Set([].concat(...filtered)));

    // Apply pagination
    return { ...this.setPagination(1, allListFiltered), allListFiltered };
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
   * remove all accents to the string.
   * @param str string to be remove all accents
   */
  removeAccents(str) {
    const accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
    const accentsOut = 'AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz';
    // tslint:disable-next-line:no-parameter-reassignment
    str = str.split('');
    const strLen = str.length;
    // tslint:disable-next-line:one-variable-per-declaration
    let i, x;
    for (i = 0; i < strLen; i++) {
      if ((x = accents.indexOf(str[i])) !== -1) {
        str[i] = accentsOut[x];
      }
    }
    return str.join('');
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
      filtered.push(
        list.filter(objectList => (
          this.removeAccents(parameterName
            .split('.').reduce((p, c) => p && p[c] || null, objectList)) // search property even within the object.
            .toLowerCase()
            .includes(searched.toLowerCase()) ? objectList : null)));
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
