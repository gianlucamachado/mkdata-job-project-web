import { Component, OnInit, EventEmitter } from '@angular/core';

import { ListControllerService } from './../../providers/utils/list-controller.service';
import { ListState } from '../../classes/State.class';
import { SolicitationService } from './solicitation.service';
import { Solicitation } from '../../classes/Solicitation.class';
import { PaginationService } from '../../components/others/pagination/pagination.service';

import { MaterializeAction } from 'angular2-materialize';

/**
 * Solicitation component.
 */
@Component({
  selector: 'app-solicitation',
  templateUrl: './solicitation.component.html',
  styleUrls: ['./solicitation.component.scss'],
})
export class SolicitationComponent implements OnInit {

  /**
   * Side navbar actions.
   */
  public sideNavActions = new EventEmitter<string | MaterializeAction>();

  /**
   * Side nav params.
   */
  public sideNavParams: any[] = [{ closeOnClick: true, edge: 'right' }];

  /**
   * Solicitation state.
   */
  public solicitationState: ListState<Solicitation> = new ListState();

  /**
   * @ignore
   */
  constructor(
    public paginationService: PaginationService,
    private listController: ListControllerService,
    private solicitationService: SolicitationService,
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
    this.solicitationState.loading = true;
    this.solicitationState.error = false;
    this.solicitationState.list = null;

    // get list with all solitations.
    this.solicitationState.allList = await this.solicitationService.getAllRequests()
      .catch(error => (
        this.solicitationState.messageError = `Erro ao buscar os dados: ${error.message}`,
        this.solicitationState.error = true,
        this.solicitationState.loading = false, []));

    // get current page.
    const pages = this.listController.setPagination(1, this.solicitationState.allList);
    // set pager controller to pagination and set current page.
    this.solicitationState.pager = pages.pagerController;
    this.solicitationState.list = pages.currentPage;
    this.solicitationState.loading = false;
  }

  /**
   * set current page.
   */
  pagination(page: number): void {
    // get current page.
    const pages = this.listController.setPagination(page, this.solicitationState.allList);
    // set pager controller to pagination and set current page.
    this.solicitationState.pager = pages.pagerController;
    this.solicitationState.list = pages.currentPage;
  }

  /**
   * Do Search and aplly pagination.
   * @param search value searched
   */
  search(search: string) {
    // params to be searched
    const params = ['employee_name', 'service_type_description', 'agency'];
    // get filters list case have filter active else get list.
    const pages = this.listController.setSearch(search, params, this.solicitationState.allList);

    // set pager controller to pagination and set current page.
    this.solicitationState.pager = pages.pagerController;
    this.solicitationState.list = pages.currentPage;
  }

  /**
   * Close filter menu.
   */
  closeFilterMenu(): void {
    // tslint:disable-next-line:no-this-assignment
    const self = this;

    // emit event to close modal
    self.sideNavActions.emit({ action: 'sideNav', params: ['hide'] });
  }

}
