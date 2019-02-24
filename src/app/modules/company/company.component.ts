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
      console.log(value);
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

      // filter data
      this.customers$ = this.customers$.pipe(
        map(arr => arr.filter(
          (item) => {
            // const compare1: string = self.utilsService.stringNormalize(item.payload.val().metadata.public.fantasyName.toLowerCase());
            // const compare2: string = self.utilsService.stringNormalize(item.payload.val().metadata.private.responsible.toLowerCase());
            // return compare1.indexOf(val) !== -1 || compare2.indexOf(val) !== -1;
            return true;
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
