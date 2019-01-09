import { Injectable } from '@angular/core';

import { HttpRequestService } from '../../providers/http-request/http-request.service';
import { Company } from '../../classes/Company.class';

@Injectable()
export class CompanyService {

  /**
   * Company endpoint.
   */
  private baseUrl = '/api/company';

  constructor(private httpRequestService: HttpRequestService) { }

  /**
   * Get list with all companies.
   */
  getAllCompanies(): Promise<Company[]> {
    return new Promise<any>(
      (resolve, reject) => {
        this.httpRequestService.getRequestWithAuthorization(`${this.baseUrl}/list`)
          .subscribe(
            response => resolve(response),
            error => reject(error),
          );
      },
    );
  }

}
