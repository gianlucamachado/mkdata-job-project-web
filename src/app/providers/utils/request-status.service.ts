import { Injectable } from '@angular/core';

import { HttpRequestService } from '../http-request/http-request.service';

@Injectable()
export class RequestStatusService {

  /**
   * Company endpoint.
   */
  private baseUrl = '/api/request-status';

  constructor(private httpRequestService: HttpRequestService) { }

  /**
   * Get list with all companies.
   */
  getAllRequestStatus(): Promise<any[]> {
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
