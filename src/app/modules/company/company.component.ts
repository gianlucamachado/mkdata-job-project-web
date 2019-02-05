import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';

import { Company } from '../../classes/Company.class';
import { CompanyService } from './company.service';
import { ListControllerService } from '../../providers/utils/list-controller.service';
import { ListState } from './../../classes/State.class';
import { PaginationService } from '../../components/others/pagination/pagination.service';
import { UtilsService } from './../../providers/utils/utils.service';

import { MaterializeAction } from 'angular2-materialize';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SweetMessageComponent } from '../../components/others/sweet-message/sweet-message.component';

/**
 * Company component.
 */
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit {

  /**
   * Side navbar actions.
   */
  public sideNavActions = new EventEmitter<string | MaterializeAction>();

  /**
   * Side nav params.
   */
  public sideNavParams: any[] = [{ closeOnClick: true, edge: 'right' }];

  /**
   * Company state.
   */
  public companyState: ListState<Company> = new ListState<Company>();

  /**
   * @ignore
   */
  constructor(
    public paginationService: PaginationService,
    private companyService: CompanyService,
    public utilsService: UtilsService,
    private listController: ListControllerService,
    public router: Router,
  ) { }

  /**
   * @ignore
   */
  ngOnInit() {
    // get list
    this.getList();
  }

  /**
   * Get all data.
   */
  async getList() {
    this.companyState.loading = true;
    this.companyState.error = false;
    this.companyState.list = null;

    // get list with all customers.
    this.companyState.allList = await this.companyService.getAllCompanies()
      .catch(error => (
        this.companyState.messageError = `Erro ao buscar os dados: ${error.message}`,
        this.companyState.error = true,
        this.companyState.loading = false, []));

    // get current page.
    const { pagerController, currentPage } = this.listController.setPagination(1, this.companyState.allList);
    // set pager controller to pagination and set current page.
    this.companyState.pager = pagerController;
    this.companyState.list = currentPage;
    this.companyState.loading = false;
  }

  /**
   * Set current page.
   */
  pagination(page: number): void {

    // Verify if exist allListSearched.
    // case not exist -> Verify if exist allListFiltered
    // case not exist -> get allList
    const list = (this.companyState.allListSearched) ?
      this.companyState.allListSearched :
      (this.companyState.allListFiltered) ?
        this.companyState.allListFiltered : this.companyState.allList;

    const pages = this.listController.setPagination(page, list);
    // set pager controller to pagination and set current page.
    this.companyState.pager = pages.pagerController;
    this.companyState.list = pages.currentPage;
  }

  /**
   * Do Search and aplly pagination.
   * @param search value searched
   */
  search(search: string) {
    // params to be searched
    const params = ['company_fantasy_name', 'company_responsible_name', 'company_cnpj', 'user_email'];

    // get filters list case have filter active else get list.
    const list = (this.companyState.allListFiltered) ? this.companyState.allListFiltered : this.companyState.allList;
    const { pagerController, currentPage, allListSearched } = this.listController.setSearch(search, params, list);

    // set pager controller to pagination, current page and searched list.
    this.companyState.allListSearched = allListSearched;
    this.companyState.pager = pagerController;
    this.companyState.list = currentPage;
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
   * Update an company.
   * @param company Company snapshot from database.
   */
  update(company: any): void {

    // log company
    console.log(company);

    // navigate
    this.router.navigate([`/administrador/empresa/associar/${company.company_id}`]);
  }

}
