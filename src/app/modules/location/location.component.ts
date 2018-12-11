import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as faker from 'faker';
import { PaginationService } from '../../components/others/pagination/pagination.service';

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
   * Location objects.
   */
  public locations: any[] = [
    {
      location_id: 0,
      locationName: faker.commerce.department(),
      locationAgency: 500,
    },
    {
      location_id: 1,
      locationName: faker.commerce.department(),
      locationAgency: 600,
    },
    {
      location_id: 2,
      locationName: faker.commerce.department(),
      locationAgency: 500,
    },
  ];

  /**
   * Current page.
   */
  public currentPage: number = 1;

  /**
   * @ignore
   */
  constructor(
    public paginationService: PaginationService,
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
      location_id: [''],
      createdAt: [''],
      locationName: ['', Validators.compose([Validators.required])],
      locationAgency: ['', Validators.compose([Validators.required])],
    });
  }

  /**
   * Search by input.
   */
  search(input: string): void {
    console.log(input);
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
  createEvent(form: FormGroup): void {
    // get form value
    const value: any = form.getRawValue();

    // log value
    console.log('createEvent()', value);

    // close modal
    this.closeModal();
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
  updateEvent(form: FormGroup): void {
    // get form value
    const value: any = form.getRawValue();

    // log value
    console.log('updateEvent()', value);

    // close modal
    this.closeModal();
  }

  /**
   * Update a location on switch event.
   * @param location location snapshot to update.
   */
  onSwitch(location: any): void {
    // log values
    console.log('onSwitch()', location);
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
