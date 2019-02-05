import { Injectable } from '@angular/core';
import { HttpRequestService } from '../../providers/http-request/http-request.service';
import { Company } from '../../classes/Company.class';
import { of } from 'rxjs/observable/of';

@Injectable()
export class CompanyService {

  /**
   * Company endpoint.
   */
  private baseUrl = '/api/company';

  /**
   * Agency url.
   */
  private agencyUrl: string = '/api/agency';

  /**
   * Service type url.
   */
  private serviceTypeUrl: string = '/api/service-type';

  /**
   * Service type agency url.
   */
  private serviceTypeAgencyUrl: string = '/api/service-type-agency';

  /**
   * @ignore
   */
  constructor(
    private httpRequestService: HttpRequestService,
  ) { }

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

  /**
   * Realize http request and get all agencies.
   * @returns Promise any.
   */
  getAgencies(): Promise<any> {
    return new Promise<any>(
      (resolve, reject) => {
        this.httpRequestService
          .getRequestWithAuthorization(`${this.agencyUrl}/list`)
          .subscribe(
            response => resolve(of(response)),
            error => reject(error),
          );
      },
    );
  }

  /**
   * Realize http request and get all service types.
   * @returns Promise any.
   */
  getServiceTypes(agencyId: string, companyId: string): Promise<any> {
    return new Promise<any>(
      (resolve, reject) => {
        this.httpRequestService
          .getRequestWithAuthorization(`${this.serviceTypeUrl}/find-by-agency/${agencyId}/${companyId}`)
          .subscribe(
            response => resolve(of(response)),
            error => reject(error),
          );
      },
    );
  }

  /**
   * Realize http request and update all service types by company and agency.
   * @returns Promise any.
   */
  updateServiceTypes(body: any): Promise<any> {
    return new Promise<any>(
      (resolve, reject) => {
        this.httpRequestService
          .postRequestWithAuthorization(this.serviceTypeAgencyUrl, body)
          .subscribe(
            response => resolve(of(response)),
            error => reject(error),
          );
      },
    );
  }

  /**
   * Create new service type agency.
   */
  createServiceTypeAgency(body: any): Promise<any> {
    return new Promise<any>(
      (resolve, reject) => {
        this.httpRequestService.putRequestWithAuthorization(this.serviceTypeAgencyUrl, body)
          .subscribe(
            response => resolve(response),
            error => reject(error),
          );
      },
    );
  }

}
