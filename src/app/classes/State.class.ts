import { Pagination } from '../providers/utils/list-controller.service';
import { OnInit } from '@angular/core';

/**
 * State for list components.
 * Controll list, loading, pagination and errors.
 */
export class ListState<T> implements OnInit {

  /**
   * Loading flag.
   */
  public loading: boolean;

  /**
   * Error flag.
   */
  public error: boolean;

  /**
   * Message error string.
   */
  public messageError: string;

  /**
   * All list filtered.
   */
  public allListFiltered?: T[];

  /**
   * All list to filter.
   */
  public allList: T[];

  /**
   * List.
   */
  public list: T[];

  /**
   * Pager controller.
   */
  public pager: Pagination;

  /**
   * @ignore
   */
  constructor() { }

  /**
   * @ignore
   */
  ngOnInit() {

    // set loading true
    this.loading = true;

    // set error false.
    this.error = false;

  }
}
