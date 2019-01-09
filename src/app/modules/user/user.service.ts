import { Injectable } from '@angular/core';

import { HttpRequestService } from '../../providers/http-request/http-request.service';

@Injectable()
export class UserService {

  /**
   * User endpoint.
   */
  private baseUrl = '/api/user';

  constructor(private httpRequestService: HttpRequestService) { }

  /**
   * Get list with all users.
   */
  getAllUsers(): Promise<any[]> {
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
