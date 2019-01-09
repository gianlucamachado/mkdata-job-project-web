import { Injectable } from '@angular/core';

import { HttpRequestService } from '../../providers/http-request/http-request.service';

/**
 * Home Service
 *
 * This a service responsible to all http requests in home module.
 */
@Injectable()
export class HomeService {

  /**
   * Company endpoint.
   */
  private baseUrl = '/api/admin/find';

  constructor(private httpRequestService: HttpRequestService) { }

  /**
   * Get admin infos.
   */
  getUserInfo(): Promise<any[]> {
    return new Promise<any>(
      (resolve, reject) => {
        this.httpRequestService.getRequestWithAuthorization(`${this.baseUrl}`)
          .subscribe(
            response => resolve(response),
            error => reject(error),
          );
      },
    );
  }

}
