import { Injectable } from '@angular/core';
import { HttpRequestService } from '../../providers/http-request/http-request.service';

@Injectable()
export class SolicitationService {

  /**
   * Company endpoint.
   */
  private baseUrl = '/api/request';

  constructor(private httpRequestService: HttpRequestService) { }

  /**
   * Get list with all companies.
   */
  getAllRequests(): Promise<any[]> {
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
