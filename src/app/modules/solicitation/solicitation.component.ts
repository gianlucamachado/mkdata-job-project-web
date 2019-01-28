import { Component, OnInit, EventEmitter } from '@angular/core';

import { ListControllerService } from './../../providers/utils/list-controller.service';
import { ListState } from '../../classes/State.class';
import { SolicitationService } from './solicitation.service';
import { Solicitation } from '../../classes/Solicitation.class';
import { PaginationService } from '../../components/others/pagination/pagination.service';

import { MaterializeAction } from 'angular2-materialize';
import { Router } from '@angular/router';
import { CreateformsService } from '../../providers/form/createforms.service';

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
   * Get filters values.
   */
  public getFiltersValues: Promise<any>;

  /**
   * @ignore
   */
  constructor(
    public paginationService: PaginationService,
    private listController: ListControllerService,
    private solicitationService: SolicitationService,
    private router: Router,
    public createForm: CreateformsService,
  ) { }

  /**
   * @ignore
   */
  ngOnInit() {

    // get filters
    this.getFiltersValues = this.createForm.getSolicitationFilter();

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
   * Set current page.
   */
  pagination(page: number): void {

    // Verify if exist allListSearched.
    // case not exist -> Verify if exist allListFiltered
    // case not exist -> get allList
    const list = (this.solicitationState.allListSearched) ?
      this.solicitationState.allListSearched :
      (this.solicitationState.allListFiltered) ?
        this.solicitationState.allListFiltered : this.solicitationState.allList;

    const pages = this.listController.setPagination(page, list);
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
    const { pagerController, currentPage, allListSearched } = this.listController.setSearch(search, this.paramsToCompareSearch, list);

    // set pager controller to pagination, current page and searched list.
    this.solicitationState.allListSearched = allListSearched;
    this.solicitationState.pager = pagerController;
    this.solicitationState.list = currentPage;
  }

  /**
   * Apply filters and do pagination
   * @param filtersParams object with filters values and dates.
   */
  filters(filtersParams) {
    // Case get filtersParams, do filters in all list
    // case filtersParams empty, set pagination and remove filteredList.
    // allListFiltered returned null case filtersParams has null.
    const { pagerController, currentPage, allListFiltered } = (filtersParams) ?
      this.listController.setFilters(filtersParams, this.solicitationState.allList) :
      this.listController.setFilters(null, this.solicitationState.allList);

    // set pager controller to pagination, current page and filtered list.
    this.solicitationState.allListFiltered = allListFiltered;
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
