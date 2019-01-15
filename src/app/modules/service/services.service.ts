import { Injectable } from '@angular/core';
import { HttpRequestService } from '../../providers/http-request/http-request.service';

@Injectable()
export class ServicesService {

  /**
   * Company endpoint.
   */
  private baseUrl = '/api/service-type';

  /**
   * @ignore
   */
  constructor(
    private httpRequestService: HttpRequestService,
  ) { }

  /**
   * Get list with all companies.
   */
  getAllServicesType(): Promise<any[]> {
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
