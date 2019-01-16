import { Component, OnInit, EventEmitter } from '@angular/core';

import { ListControllerService } from './../../providers/utils/list-controller.service';
import { ListState } from '../../classes/State.class';
import { SolicitationService } from './solicitation.service';
import { Solicitation } from '../../classes/Solicitation.class';
import { PaginationService } from '../../components/others/pagination/pagination.service';

import { MaterializeAction } from 'angular2-materialize';
import { Router } from '@angular/router';

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
   * Search params.
   */
  public paramsToCompareSearch = ['employee_name', 'service_type_description', 'agency'];

  /**
   * Number method
   */
  public number: NumberConstructor = Number;

  /**
   * @ignore
   */
  constructor(
    public paginationService: PaginationService,
    private listController: ListControllerService,
    private solicitationService: SolicitationService,
    private router: Router,
  ) { }

  /**
   * @ignore
   */
  ngOnInit() {

    // initialize
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
    // get filters list case have filter active else get list.
    const list = (this.solicitationState.allListFiltered) ? this.solicitationState.allListFiltered : this.solicitationState.allList;
    const { pagerController, currentPage } = this.listController.setSearch(search, this.paramsToCompareSearch, list);

    // set pager controller to pagination and set current page.
    this.solicitationState.pager = pagerController;
    this.solicitationState.list = currentPage;
  }

  /**
   * Apply filters and do pagination
   * @param state object with filters values and dates.
   */
  filters(state) {
    // Get filters.
    const { pagerController, currentPage } = (!state) ?
      (this.solicitationState.allListFiltered = null, this.listController.setFilters(null, this.solicitationState.allList)) :
      this.listController.setFilters(state, this.solicitationState.allList);

    // set pager controller to pagination and set current page.
    this.solicitationState.pager = pagerController;
    this.solicitationState.list = currentPage;
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

  /**
   * Open request details.
   */
  openDetails(solicitation: any) {

    // log solicitation
    console.log(solicitation);

    // navigate
    this.router.navigate([`/administrador/solicitacao/detalhes/${solicitation.request_id}`]);

  }

}
