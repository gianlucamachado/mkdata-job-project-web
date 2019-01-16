import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';

import { Company } from '../../classes/Company.class';
import { CompanyService } from './company.service';
import { ListControllerService } from '../../providers/utils/list-controller.service';
import { ListState } from './../../classes/State.class';
import { PaginationService } from '../../components/others/pagination/pagination.service';
import { UtilsService } from './../../providers/utils/utils.service';

import { MaterializeAction } from 'angular2-materialize';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
   * Modal actions.
   */
  public modalActions = new EventEmitter<any | MaterializeAction>();

  /*
   * Modal form.
   */
  public modalForm: FormGroup;

  /**
   * Submit attempt variable.
   */
  public submitAttempt: boolean = false;

  /**
   * Modal params.
   */
  public modelParams = [
    {
      dismissible: false,
      complete: () => { },
    },
  ];

  /**
   * Swal options.
   */
  public swalOptions: any = {
    title: '',
    content: '',
    button: 'Entendi',
  };

  /**
   * View message child.
   */
  @ViewChild(SweetMessageComponent) messageComponent: SweetMessageComponent;

  /**
   * @ignore
   */
  constructor(
    public paginationService: PaginationService,
    private companyService: CompanyService,
    public utilsService: UtilsService,
    private listController: ListControllerService,
    private formBuilder: FormBuilder,
    public router: Router,
  ) { }

  /**
   * @ignore
   */
  ngOnInit() {
    // initialize form
    this.initializeForm();

    // get list
    this.getList();
  }

  /**
   * Initialize Form.
   */
  initializeForm(): void {
    // tslint:disable-next-line:no-this-assignment
    const self = this;

    // form group
    self.modalForm = self.formBuilder.group({
      agency_id: ['', Validators.compose([Validators.required])],
      company_id: ['', Validators.compose([Validators.required])],
      service_type_id: ['', Validators.compose([Validators.required])],
    });
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
   * set current page.
   */
  pagination(page: number): void {
    // get current page.
    const { pagerController, currentPage } = this.listController.setPagination(page, this.companyState.allList);
    // set pager controller to pagination and set current page.
    this.companyState.pager = pagerController;
    this.companyState.list = currentPage;
  }

  /**
   * Do Search and aplly pagination.
   * @param search value searched
   */
  search(search: string) {
    // params to be searched
    const params = ['company_fantasy_name', 'company_responsible_name', 'company_cnpj', 'user_email'];
    // get filters list case have filter active else get list.
    const { pagerController, currentPage } = this.listController.setSearch(search, params, this.companyState.allList);
    // set pager controller to pagination and set current page.
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
   * Update a service.
   * @param service Service snapshot to remove from database.
   */
  update(service: any): void {
    // tslint:disable-next-line:no-this-assignment
    const self = this;

    // path values
    self.modalForm.patchValue(service);

    // open modal
    self.openModal();
  }

  /**
   * Update a service.
   * @param form Form with values.
   */
  async updateEvent(form: FormGroup) {

    // get form value
    const value: any = form.getRawValue();

    // log value
    console.log('updateEvent()', value);

    // close modal
    this.closeModal();

    // present loading
    this.companyState.loading = true;

    // try/catch
    try {

      // add new service type
      const response: any = await this.companyService.createServiceTypeAgency(value);

      // log response
      console.log(response);

      // message
      this.swalOptions.title = 'Sucesso';
      this.swalOptions.content = 'Empresa atualizado com sucesso';
      this.swalOptions.button = 'Entendi';

    } catch (e) {

      // log
      console.error(e);

      // message
      this.swalOptions.title = 'Erro';
      this.swalOptions.content = 'Erro ao atualizar empresa';
      this.swalOptions.button = 'Entendi';

    }

    // show message
    this.messageComponent.show();

    // get info
    this.getList();
  }

  /**
   * Open modal.
   */
  openModal(): void {
    // tslint:disable-next-line:no-this-assignment
    const self = this;

    // emit event to open modal
    self.modalActions.emit({ action: 'modal', params: ['open'] });
  }

  /**
   * Close modal page.
   */
  closeModal(): void {
    // tslint:disable-next-line:no-this-assignment
    const self = this;

    // set false submit attempt
    self.submitAttempt = false;

    // reset form
    self.initializeForm();

    // emit event to close modal
    self.modalActions.emit({ action: 'modal', params: ['close'] });
  }

}
