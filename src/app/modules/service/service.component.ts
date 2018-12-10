import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as faker from 'faker';

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
   * Loading variable
   */
  public loading: boolean = true;

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
   * Services objects.
   */
  public services: any[] = [
    {
      service_id: 0,
      icon: faker.image.business(),
      serviceName: faker.commerce.productMaterial(),
    },
    {
      service_id: 1,
      icon: faker.image.business(),
      serviceName: faker.commerce.productMaterial(),
    },
    {
      service_id: 2,
      icon: faker.image.business(),
      serviceName: faker.commerce.productMaterial(),
    },
  ];

  /**
   * @ignore
   */
  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
  ) { }

  /**
   * @ignore
   */
  ngOnInit() {
    // tslint:disable-next-line:no-this-assignment
    const self = this;

    // initialize form
    self.initializeForm();

    // loading
    setTimeout(_ => self.loading = false, 1000);
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
   * Search by input.
   */
  search(input: string): void {
    console.log(input);
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
