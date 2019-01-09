import { Injectable } from '@angular/core';
import { HttpRequestService } from '../../providers/http-request/http-request.service';

/**
 * Recovery password service.
 */
@Injectable()
export class RecoveryService {

  /**
   * Login url.
   */
  private recoveryUrl: string = '/api/recovery-password/change-password';

  /**
   * @ignore
   */
  constructor(
    private httpRequestService: HttpRequestService,
  ) { }

  /**
   * Realize http request and change password.
   * @param body Body of request.
   * @returns Promise any.
   */
  changePassword(body: any, token: string): Promise<any> {
    return new Promise<any>(
      (resolve, reject) => {
        this.httpRequestService
          .postRequestWithAuthorization(this.recoveryUrl, body, 'application/json', token)
          .subscribe(
            response => resolve(response),
            error => reject(error),
          );
      },
    );
  }

}
