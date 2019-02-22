import { Injectable } from '@angular/core';
import { HttpRequestService } from '../../providers/http-request/http-request.service';
import { of } from 'rxjs/observable/of';

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
   * Find company.
   */
  // getCompany(companyId: string): Promise<Company[]> {
  //   return new Promise<any>(
  //     (resolve, reject) => {
  //       this.httpRequestService.getRequestWithAuthorization(`${this.baseUrl}/find-by-company-id/${companyId}`)
  //         .subscribe(
  //           response => resolve(response),
  //           error => reject(error),
  //         );
  //     },
  //   );
  // }

  /**
   * Get list with all companies.
   */
  // getAllCompanies(): Promise<Company[]> {
  //   return new Promise<any>(
  //     (resolve, reject) => {
  //       this.httpRequestService.getRequestWithAuthorization(`${this.baseUrl}/list`)
  //         .subscribe(
  //           response => resolve(response),
  //           error => reject(error),
  //         );
  //     },
  //   );
  // }

  /**
   * Realize http request and get all agencies.
   * @returns Promise any.
   */
  // getAgencies(): Promise<any> {
  //   return new Promise<any>(
  //     (resolve, reject) => {
  //       this.httpRequestService
  //         .getRequestWithAuthorization(`${this.agencyUrl}/list`)
  //         .subscribe(
  //           response => resolve(of(response)),
  //           error => reject(error),
  //         );
  //     },
  //   );
  // }

  /**
   * Realize http request and get all service types.
   * @returns Promise any.
   */
  // getServiceTypes(agencyId: string, companyId: string): Promise<any> {
  //   return new Promise<any>(
  //     (resolve, reject) => {
  //       this.httpRequestService
  //         .getRequestWithAuthorization(`${this.serviceTypeUrl}/find-by-agency/${agencyId}/${companyId}`)
  //         .subscribe(
  //           response => resolve(of(response)),
  //           error => reject(error),
  //         );
  //     },
  //   );
  // }

  /**
   * Realize http request and update all service types by company and agency.
   * @returns Promise any.
   */
  // updateServiceTypes(body: any): Promise<any> {
  //   return new Promise<any>(
  //     (resolve, reject) => {
  //       this.httpRequestService
  //         .postRequestWithAuthorization(this.serviceTypeAgencyUrl, body)
  //         .subscribe(
  //           response => resolve(of(response)),
  //           error => reject(error),
  //         );
  //     },
  //   );
  // }

  /**
   * Create new service type agency.
   */
  // createServiceTypeAgency(body: any): Promise<any> {
  //   return new Promise<any>(
  //     (resolve, reject) => {
  //       this.httpRequestService.putRequestWithAuthorization(this.serviceTypeAgencyUrl, body)
  //         .subscribe(
  //           response => resolve(response),
  //           error => reject(error),
  //         );
  //     },
  //   );
  // }

}
