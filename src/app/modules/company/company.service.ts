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

}
