import { ListControllerService } from './../../providers/utils/list-controller.service';
import { LocationService } from './location.service';
import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as faker from 'faker';
import { PaginationService } from '../../components/others/pagination/pagination.service';
import { ListState } from '../../classes/State.class';
import { SweetMessageComponent } from '../../components/others/sweet-message/sweet-message.component';

/**
 * Location Component.
 */
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {

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
   * location State.
   */
  public locationState: ListState<Location> = new ListState();

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
    public router: Router,
    private formBuilder: FormBuilder,
    private locationService: LocationService,
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
      environment_id: [''],
      environment_description: ['', Validators.compose([Validators.required])],
      environment_active: ['1', Validators.compose([Validators.required])],
      agency_id: ['', Validators.compose([Validators.required])],
    });
  }

  /**
   * Get all data.
   */
  async getList() {
    this.locationState.loading = true;
    this.locationState.error = false;
    this.locationState.list = null;

    // get list with all customers.
    this.locationState.allList = await this.locationService.getAllLocation()
      .catch(error => (
        this.locationState.messageError = `Erro ao buscar os dados: ${error.message}`,
        this.locationState.error = true,
        this.locationState.loading = false, []));

    // get current page.
    const pages = this.listController.setPagination(1, this.locationState.allList);
    // set pager controller to pagination and set current page.
    this.locationState.pager = pages.pagerController;
    this.locationState.list = pages.currentPage;
    this.locationState.loading = false;
  }

  /**
   * set current page.
   */
  pagination(page: number): void {
    // get current page.
    const pages = this.listController.setPagination(page, this.locationState.allList);
    // set pager controller to pagination and set current page.
    this.locationState.pager = pages.pagerController;
    this.locationState.list = pages.currentPage;
  }

  /**
   * Do Search and aplly pagination.
   * @param search value searched
   */
  search(search: string) {
    // params to be searched
    const params = ['environment_description'];
    // get filters list case have filter active else get list.
    const pages = this.listController.setSearch(search, params, this.locationState.allList);

    // set pager controller to pagination and set current page.
    this.locationState.pager = pages.pagerController;
    this.locationState.list = pages.currentPage;
  }

  /**
   * Create a location.
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
   * Save a location.
   * @param form Form with values.
   */
  async createEvent(form: FormGroup) {
    // get form value
    const value: any = form.getRawValue();

    // log value
    console.log('createEvent()', value);

    // close modal
    this.closeModal();

    // present loading
    this.locationState.loading = true;

    // try/catch
    try {

      // add new service type
      const response: any = await this.locationService.createEnvironment(value);

      // log response
      console.log(response);

      // message
      this.swalOptions.title = 'Sucesso';
      this.swalOptions.content = 'Local adicionado com sucesso';
      this.swalOptions.button = 'Entendi';

    } catch (e) {

      // log
      console.error(e);

      // message
      this.swalOptions.title = 'Erro';
      this.swalOptions.content = 'Erro ao criar local';
      this.swalOptions.button = 'Entendi';

    }

    // show message
    this.messageComponent.show();

    // get info
    this.getList();
  }

  /**
   * Update a location.
   * @param location location snapshot to remove from database.
   */
  update(location: any): void {
    // tslint:disable-next-line:no-this-assignment
    const self = this;

    // path values
    self.modalForm.patchValue(location);

    // set edit mode
    self.editMode = true;

    // open modal
    self.openModal();
  }

  /**
   * Update a location.
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
    this.locationState.loading = true;

    // try/catch
    try {

      // add new service type
      const response: any = await this.locationService.updateEnvironment(value, value.environment_id);

      // log response
      console.log(response);

      // message
      this.swalOptions.title = 'Sucesso';
      this.swalOptions.content = 'Local atualizado com sucesso';
      this.swalOptions.button = 'Entendi';

    } catch (e) {

      // log
      console.error(e);

      // message
      this.swalOptions.title = 'Erro';
      this.swalOptions.content = 'Erro ao atualizar local';
      this.swalOptions.button = 'Entendi';

    }

    // show message
    this.messageComponent.show();

    // get info
    this.getList();
  }

  /**
   * Update a location on switch event.
   * @param location location snapshot to update.
   */
  async onSwitch(event: any, location: any) {

    // log values
    console.log('onSwitch()', event.target.checked);

    // tslint:disable-next-line:no-this-assignment
    const self = this;

    // path values
    self.modalForm.patchValue(location);

    // const active
    const active: string = (event.target.checked) ? '1' : '0';

    // set new value
    self.modalForm.controls.environment_active.setValue(active);

    // get value
    const value: any = self.modalForm.getRawValue();

    // log value
    console.log(value);

    // try/catch
    try {

      // add new service type
      const response: any = await this.locationService.updateEnvironment(value, value.environment_id);

      // log response
      console.log(response);

    } catch (e) {

      // log
      console.error(e);

    }
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
