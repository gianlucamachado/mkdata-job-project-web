import { Injectable } from '@angular/core';
import { HttpRequestService } from '../../providers/http-request/http-request.service';
import { of } from 'rxjs/observable/of';

/**
 * Location service.
 */
@Injectable()
export class LocationService {

  /**
   * Location endpoint.
   */
  private baseUrl = '/api/environment';

  /**
   * Agency url.
   */
  private agencyUrl: string = '/api/agency';

  /**
   * @ignore
   */
  constructor(
    private httpRequestService: HttpRequestService,
  ) { }

  /**
   * Get list with all locations.
   */
  getAllLocation(): Promise<any[]> {
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
   * Create environment.
   */
  createEnvironment(body: any): Promise<any[]> {
    return new Promise<any>(
      (resolve, reject) => {
        this.httpRequestService.putRequestWithAuthorization(this.baseUrl, body)
          .subscribe(
            response => resolve(response),
            error => reject(error),
          );
      },
    );
  }

  /**
   * Update environment.
   */
  updateEnvironment(body: any, id: string): Promise<any> {
    return new Promise<any>(
      (resolve, reject) => {
        this.httpRequestService.postRequestWithAuthorization(`${this.baseUrl}/${id}`, body)
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

}
