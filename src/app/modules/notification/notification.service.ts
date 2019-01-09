import { Injectable } from '@angular/core';
import { HttpRequestService } from '../../providers/http-request/http-request.service';

@Injectable()
export class NotificationService {

  /**
   * Company endpoint.
   */
  private baseUrl = '/api/notification';

  constructor(private httpRequestService: HttpRequestService) { }

  /**
   * Get list with last 50 notifications.
   */
  getLast50Notifications(): Promise<any[]> {
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
