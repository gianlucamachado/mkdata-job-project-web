import { Injectable } from '@angular/core';
import { HttpRequestService } from '../../providers/http-request/http-request.service';
import { of } from 'rxjs/observable/of';
import { Customer } from '../../classes/Customer.class';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CompanyService {

  /**
   * Customer endpoint.
   */
  private baseUrl = '/api/customers';

  /**
   * @ignore
   */
  constructor(
    private httpRequestService: HttpRequestService,
  ) { }

  /**
   * Get list with all customers.
   */
  getAllCustomers(): Promise<Observable<Customer[]>> {
    return new Promise<any>(
      (resolve, reject) => {
        this.httpRequestService.getRequestWithAuthorization(`${this.baseUrl}`)
          .subscribe(
            response => resolve(of(response)),
            error => reject(error),
          );
      },
    );
  }

  /**
   * Get customer by id.
   */
  getCustomerById(customer_id: string): Promise<Customer> {
    return new Promise<any>(
      (resolve, reject) => {
        this.httpRequestService.getRequestWithAuthorization(`${this.baseUrl}/${customer_id}`)
          .subscribe(
            response => resolve(response),
            error => reject(error),
          );
      },
    );
  }

  /**
   * Create new customer.
   */
  createNewCustomer(body: Customer): Promise<Customer> {
    return new Promise<any>(
      (resolve, reject) => {
        this.httpRequestService.putRequestWithAuthorization(`${this.baseUrl}`, body)
          .subscribe(
            response => resolve(response),
            error => reject(error),
          );
      },
    );
  }

  /**
   * Update customer.
   */
  updateCustomer(body: Customer): Promise<Customer> {
    return new Promise<any>(
      (resolve, reject) => {
        this.httpRequestService.postRequestWithAuthorization(`${this.baseUrl}/${body.customer_id}`, body)
          .subscribe(
            response => resolve(response),
            error => reject(error),
          );
      },
    );
  }

  /**
   * delete customer.
   */
  deleteCustomer(customer_id: string): Promise<Customer> {
    return new Promise<any>(
      (resolve, reject) => {
        this.httpRequestService.deleteRequestWithAuthorization(`${this.baseUrl}/${customer_id}`)
          .subscribe(
            response => resolve(response),
            error => reject(error),
          );
      },
    );
  }

}
