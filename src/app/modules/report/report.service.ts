import { Injectable } from '@angular/core';

import { HttpRequestService } from '../../providers/http-request/http-request.service';

@Injectable()
export class ReportService {

  /**
   * Report endpoint.
   */
  private baseUrl = '/api/report';

  constructor(private httpRequestService: HttpRequestService) { }

  /**
   * Get list with all companies.
   */
  getReportBydate(date: string): Promise<any[]> {
    return new Promise<any>(
      (resolve, reject) => {
        this.httpRequestService.getRequestWithAuthorization(`${this.baseUrl}?${date}`)
          .subscribe(
            response => resolve(response),
            error => reject(error),
          );
      },
    );
  }

}
