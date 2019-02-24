import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';

import { CompanyService } from './company.service';
import { PaginationService } from '../../components/others/pagination/pagination.service';
import { UtilsService } from './../../providers/utils/utils.service';

import { MaterializeAction } from 'angular2-materialize';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Customer } from '../../classes/Customer.class';
import { FormGroup, FormBuilder } from '@angular/forms';
import { filter, map } from 'rxjs/operators';
import { SweetDefaultOptionComponent } from '../../components/others/sweet-default-option/sweet-default-option.component';
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
   * Show loading component flag.
   */
  public loading: boolean = true;

  /**
   * Customers list.
   */
  public customers$: Observable<Customer[]>;

  /**
   * Current page.
   */
  public currentPage: number = 1;

  /**
   * All groups to select.
   */
  public groups: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  /**
   * Filter form.
   */
  public filterForm: FormGroup;

  /**
   * Input value from search.
   */
  public input: string = '';

  /**
   * Customer that will be deleted.
   */
  public customer: Customer;

  /**
   * Save number of customers.
   */
  public numberOfCustomers: number = 0;

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
  @ViewChild(SweetDefaultOptionComponent) optionComponent: SweetDefaultOptionComponent;

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
    public router: Router,
    private formBuilder: FormBuilder,
  ) { }

  /**
   * @ignore
   */
  async ngOnInit() {

    // initialize filter form
    this.filterForm = this.formBuilder.group({
      active: [true],
      inactive: [true],
      group: [''],
    });

    try {

      // get customers
      this.customers$ = await this.companyService.getAllCustomers();

      // get total of customers
      this.customers$.subscribe(data => this.numberOfCustomers = data.length);

      // dismiss loading
      setTimeout(() => this.loading = false, 500);

    } catch (e) {

      // log error
      console.error(e);

    }

    // subscribe filter form
    this.filterForm.valueChanges.subscribe((value) => {
      this.search(this.input);
    });

  }

  /**
   * Do Search and aplly pagination.
   * @param search value searched
   */
  async search(search: string) {

    // set new input
    this.input = search;

    // get all values
    try {

      // get customers
      this.customers$ = await this.companyService.getAllCustomers();

      // const compare string
      const compare: string = this.utilsService.stringNormalize(search);

      // get filter form value
      const filterFormValue: any = this.filterForm.getRawValue();
      console.log(filterFormValue);

      // filter data
      this.customers$ = this.customers$.pipe(
        map(arr => arr.filter(
          (item) => {
            const name: string = this.utilsService.stringNormalize(item.name.toLowerCase());
            const email: string = this.utilsService.stringNormalize(item.email.toLowerCase());
            const document: string = this.utilsService.stringNormalize(item.document_one.toLowerCase());
            let finalValue = name.indexOf(compare) !== -1 || email.indexOf(compare) !== -1 || document.indexOf(compare) !== -1;

            if (filterFormValue.active && !filterFormValue.inactive) {
              finalValue = finalValue && item.is_active;
            } else if (!filterFormValue.active && filterFormValue.inactive) {
              finalValue = finalValue && !item.is_active;
            } else if (!filterFormValue.active && !filterFormValue.inactive) {
              finalValue = finalValue && (item.is_active && !item.is_active);
            }

            if (filterFormValue.group !== '' && filterFormValue.group !== 'Todos') {
              finalValue = finalValue && item.group === filterFormValue.group;
            }

            return finalValue;
          },
        )),
      );

    } catch (e) {

      // log error
      console.error(e);

    }

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
   * Update a customer.
   * @param customer Customer snapshot from database.
   */
  update(customer: Customer): void {

    // log customer
    console.log(customer);

    // navigate
    this.router.navigate([`/administrador/empresa/editar/${customer.customer_id}`]);

  }

  /**
   * Confirm customer deletion;
   */
  openConfirmationSwal(customer: Customer) {

    // set message
    this.swalOptions.title = 'Confirmação';
    this.swalOptions.content = 'Deseja realmente excluir esse cliente?';
    this.swalOptions.button = 'Entendi';

    // show swal
    this.optionComponent.show();

    // save customer
    this.customer = customer;
  }

  /**
   * Delete a customer.
   * @param customer Customer snapshot from database.
   */
  async delete(customer: Customer) {

    // log customer
    console.log(customer);

    try {

      // delete customer
      await this.companyService.deleteCustomer(customer.customer_id);

      // set message
      this.swalOptions.title = 'Sucesso';
      this.swalOptions.content = 'Cliente excluído com sucesso';
      this.swalOptions.button = 'Entendi';
      this.messageComponent.show();

      // presente loading
      this.loading = true;

      // get customers
      this.customers$ = await this.companyService.getAllCustomers();

      // dismiss loading
      setTimeout(() => this.loading = false, 500);

    } catch (e) {

      // show error
      console.error(e);

    }

  }

  /**
   * Create a customer.
   */
  create(): void {

    // navigate
    this.router.navigate(['/administrador/empresa/novo']);

  }

}
