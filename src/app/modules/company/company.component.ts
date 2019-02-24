import { Component, OnInit, EventEmitter } from '@angular/core';

import { CompanyService } from './company.service';
import { PaginationService } from '../../components/others/pagination/pagination.service';
import { UtilsService } from './../../providers/utils/utils.service';

import { MaterializeAction } from 'angular2-materialize';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Customer } from '../../classes/Customer.class';
import { Subscriber } from 'rxjs/Subscriber';
import * as faker from 'faker';

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
   * @ignore
   */
  constructor(
    public paginationService: PaginationService,
    private companyService: CompanyService,
    public utilsService: UtilsService,
    public router: Router,
  ) { }

  /**
   * @ignore
   */
  async ngOnInit() {

    try {

      // get customers
      this.customers$ = await this.companyService.getAllCustomers();

      // dismiss loading
      setTimeout(() => this.loading = false, 500);

    } catch (e) {

      // log error
      console.error(e);

    }
  }

  /**
   * Do Search and aplly pagination.
   * @param search value searched
   */
  search(search: string) {

    // log search
    console.log(search);

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
