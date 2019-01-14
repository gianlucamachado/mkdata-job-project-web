import { Pagination } from '../providers/utils/list-controller.service';

/**
 * State for list components.
 * Controll list, loading, pagination and errors.
 */
export class ListState<T> {

  public loading: boolean;
  public error: boolean;
  public messageError: string;
  public allListFiltered?: T[];
  public allList: T[];
  public list: T[];
  public pager: Pagination;

  constructor() {
    this.loading = true;
    this.error = false;
  }
}
