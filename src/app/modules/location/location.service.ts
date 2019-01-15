import { Injectable } from '@angular/core';
import { HttpRequestService } from '../../providers/http-request/http-request.service';

@Injectable()
export class LocationService {

  /**
   * Location endpoint.
   */
  private baseUrl = '/api/environment';

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

}
