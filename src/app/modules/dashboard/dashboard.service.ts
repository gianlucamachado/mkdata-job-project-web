import { Injectable } from '@angular/core';

import { HttpRequestService } from '../../providers/http-request/http-request.service';

@Injectable()
export class DashboardService {

  /**
   * Dashboard endpoint.
   */
  private baseUrl = '/api/dashboard';

  /**
   * @ignore
   */
  constructor(
    private httpRequestService: HttpRequestService,
  ) { }

  /**
   * Get all dashboard data.
   */
  getDashboardData(): Promise<any[]> {
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
