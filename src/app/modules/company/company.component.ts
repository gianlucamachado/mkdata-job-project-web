import { Component, OnInit, EventEmitter } from '@angular/core';

import { CompanyService } from './company.service';
import { PaginationService } from '../../components/others/pagination/pagination.service';
import { UtilsService } from './../../providers/utils/utils.service';

import { MaterializeAction } from 'angular2-materialize';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Customer } from '../../classes/Customer.class';
import { FormGroup, FormBuilder } from '@angular/forms';
import { filter, map } from 'rxjs/operators';

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

    // log search
    console.log(search);

    // get all values
    try {

      // get customers
      this.customers$ = await this.companyService.getAllCustomers();

      // const compare string
      const compare: string = this.utilsService.stringNormalize(search);

      // get filter form value
      const filterFormValue: any = this.filterForm.getRawValue();

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
            } else {
              finalValue = finalValue && (item.is_active || !item.is_active);
            }

            if (filterFormValue.group !== 'Todos') {
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
   * Create a customer.
   */
  create(): void {

    // navigate
    this.router.navigate(['/administrador/empresa/novo']);

  }

}
