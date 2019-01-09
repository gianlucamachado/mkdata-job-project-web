import { Component, OnInit, EventEmitter } from '@angular/core';

import { Company } from '../../classes/Company.class';
import { CompanyService } from './company.service';
import { ListControllerService } from '../../providers/utils/list-controller.service';
import { ListState } from './../../classes/State.class';
import { PaginationService } from '../../components/others/pagination/pagination.service';
import { UtilsService } from './../../providers/utils/utils.service';

import { MaterializeAction } from 'angular2-materialize';

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
  public companySate: ListState<Company> = new ListState<Company>();

  /**
   * @ignore
   */
  constructor(
    public paginationService: PaginationService,
    private companyService: CompanyService,
    public utilsService: UtilsService,
    private listController: ListControllerService,
  ) { }

  /**
   * @ignore
   */
  ngOnInit() {

    this.getList();
  }

  /**
   * Get all data.
   */
  async getList() {
    this.companySate.loading = true;
    this.companySate.error = false;
    this.companySate.list = null;

    // get list with all customers.
    this.companySate.allList = await this.companyService.getAllCompanies()
      .catch(error => (
        this.companySate.messageError = `Erro ao buscar os dados: ${error.message}`,
        this.companySate.error = true,
        this.companySate.loading = false, []));

    // get current page.
    const pages = this.listController.setPagination(1, this.companySate.allList);
    // set pager controller to pagination and set current page.
    this.companySate.pager = pages.pagerController;
    this.companySate.list = pages.currentPage;
    this.companySate.loading = false;
  }

  /**
   * set current page.
   */
  pagination(page: number): void {
    // get current page.
    const pages = this.listController.setPagination(page, this.companySate.allList);
    // set pager controller to pagination and set current page.
    this.companySate.pager = pages.pagerController;
    this.companySate.list = pages.currentPage;
  }

  /**
   * Do Search and aplly pagination.
   * @param search value searched
   */
  search(search: string) {
    // params to be searched
    const params = ['company_fantasy_name', 'company_responsible_name'];
    // get filters list case have filter active else get list.
    const pages = this.listController.setSearch(search, params, this.companySate.allList);

    // set pager controller to pagination and set current page.
    this.companySate.pager = pages.pagerController;
    this.companySate.list = pages.currentPage;
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
