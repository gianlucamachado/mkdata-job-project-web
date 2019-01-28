import { Component, OnInit } from '@angular/core';

import { ListControllerService } from '../../providers/utils/list-controller.service';
import { ListState } from '../../classes/State.class';
import { UserService } from './user.service';
import { PaginationService } from './../../components/others/pagination/pagination.service';
import { Employee } from '../../classes/Employee.class';

/**
 * User component.
 */
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

  /**
   * User state.
   */
  public userState: ListState<Employee> = new ListState();

  /**
   * @ignore
   */
  constructor(
    public paginationService: PaginationService,
    private userService: UserService,
    private listController: ListControllerService,
  ) { }

  /**
   * @ignore
   */
  ngOnInit() {

    this.getList();
  }

  /**
   * Get data from api.
   */
  async getList() {
    this.userState.loading = true;
    this.userState.error = false;
    this.userState.list = null;

    // get list with all customers.
    this.userState.allList = await this.userService.getAllUsers()
      .catch(error => (
        this.userState.messageError = `Erro ao buscar os dados: ${error.message}`,
        this.userState.error = true,
        this.userState.loading = false, []));

    // get current page.
    const pages = this.listController.setPagination(1, this.userState.allList);
    // set pager controller to pagination and set current page.
    this.userState.pager = pages.pagerController;
    this.userState.list = pages.currentPage;
    this.userState.loading = false;
  }

  /**
   * Set current page.
   */
  pagination(page: number): void {

    // Verify if exist allListSearched.
    // case not exist -> Verify if exist allListFiltered
    // case not exist -> get allList
    const list = (this.userState.allListSearched) ?
      this.userState.allListSearched :
      (this.userState.allListFiltered) ?
        this.userState.allListFiltered : this.userState.allList;

    const pages = this.listController.setPagination(page, list);
    // set pager controller to pagination and set current page.
    this.userState.pager = pages.pagerController;
    this.userState.list = pages.currentPage;
  }

  /**
   * Do Search and aplly pagination.
   * @param search value searched
   */
  search(search: string) {
    // params to be searched
    const params = ['user_email', 'employee_name'];

    // get filters list case have filter active else get list.
    const list = (this.userState.allListFiltered) ? this.userState.allListFiltered : this.userState.allList;
    const { pagerController, currentPage, allListSearched } = this.listController.setSearch(search, params, list);

    // set pager controller to pagination, current page and searched list.
    this.userState.allListSearched = allListSearched;
    this.userState.pager = pagerController;
    this.userState.list = currentPage;
  }

}
