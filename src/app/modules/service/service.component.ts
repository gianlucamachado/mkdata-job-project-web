import { ListState } from './../../classes/State.class';
import { ListControllerService } from './../../providers/utils/list-controller.service';
import { ServicesService } from './services.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as faker from 'faker';
import { PaginationService } from '../../components/others/pagination/pagination.service';
import { Service } from '../../classes/Service.class';

/**
 * Service component.
 */
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
})
export class ServiceComponent implements OnInit {

  /**
   * Modal actions.
   */
  public modalActions = new EventEmitter<any | MaterializeAction>();

  /*
   * Modal form.
   */
  public modalForm: FormGroup;

  /**
   * Edit mode.
   */
  public editMode: boolean = false;

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
   * Service class state.
   */
  public serviceState: ListState<Service> = new ListState();

  /**
   * @ignore
   */
  constructor(
    public paginationService: PaginationService,
    public router: Router,
    private servicesService: ServicesService,
    private formBuilder: FormBuilder,
    private listController: ListControllerService,
  ) { }

  /**
   * @ignore
   */
  ngOnInit() {
    // tslint:disable-next-line:no-this-assignment
    const self = this;

    // initialize form
    self.initializeForm();

    this.getList();
  }

  /**
   * Get all Data.
   */
  async getList() {
    this.serviceState.loading = true;
    this.serviceState.error = false;
    this.serviceState.list = null;

    // get list with all customers.
    this.serviceState.allList = await this.servicesService.getAllServicesType()
      .catch(error => (
        this.serviceState.messageError = `Erro ao buscar os dados: ${error.message}`,
        this.serviceState.error = true,
        this.serviceState.loading = false, []));

    // get current page.
    const pages = this.listController.setPagination(1, this.serviceState.allList);
    // set pager controller to pagination and set current page.
    this.serviceState.pager = pages.pagerController;
    this.serviceState.list = pages.currentPage;
    this.serviceState.loading = false;
  }

  /**
   * set current page.
   */
  pagination(page: number): void {
    // get current page.
    const pages = this.listController.setPagination(page, this.serviceState.allList);
    // set pager controller to pagination and set current page.
    this.serviceState.pager = pages.pagerController;
    this.serviceState.list = pages.currentPage;
  }

  /**
   * Do Search and aplly pagination.
   * @param search value searched
   */
  search(search: string) {
    // params to be searched
    const params = ['service_type_description'];
    // get filters list case have filter active else get list.
    const pages = this.listController.setSearch(search, params, this.serviceState.allList);

    // set pager controller to pagination and set current page.
    this.serviceState.pager = pages.pagerController;
    this.serviceState.list = pages.currentPage;
  }

  /**
   * Initialize Form.
   */
  initializeForm(): void {
    // tslint:disable-next-line:no-this-assignment
    const self = this;

    // form group
    self.modalForm = self.formBuilder.group({
      service_id: [''],
      createdAt: [0, Validators.compose([Validators.required])],
      serviceName: ['', Validators.compose([Validators.required])],
      icon: ['', Validators.compose([Validators.required])],
    });
  }

  /**
   * Create a service.
   */
  create(): void {
    // tslint:disable-next-line:no-this-assignment
    const self = this;

    // log method
    console.log('create()');

    // open modal
    self.openModal();
  }

  /**
   * Save a service.
   * @param form Form with values.
   */
  createEvent(form: FormGroup): void {
    // get form value
    const value: any = form.getRawValue();

    // log value
    console.log('createEvent()', value);

    // close modal
    this.closeModal();
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

    // set edit mode
    self.editMode = true;

    // open modal
    self.openModal();
  }

  /**
   * Update a service.
   * @param form Form with values.
   */
  updateEvent(form: FormGroup): void {
    // get form value
    const value: any = form.getRawValue();

    // log value
    console.log('updateEvent()', value);

    // close modal
    this.closeModal();
  }

  /**
   * Update a service on switch event.
   * @param service Service snapshot to update.
   */
  onSwitch(service: any): void {
    // log values
    console.log('onSwitch()', service);
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

    // set false edit mode
    self.editMode = false;

    // reset form
    self.initializeForm();

    // emit event to close modal
    self.modalActions.emit({ action: 'modal', params: ['close'] });
  }

}
