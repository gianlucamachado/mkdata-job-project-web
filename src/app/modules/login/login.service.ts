import { Injectable } from '@angular/core';
import { HttpRequestService } from '../../providers/http-request/http-request.service';

/**
 * Service to authentication users with firebase.
 */
@Injectable()
export class LoginService {

  /**
   * Login url.
   */
  private loginUrl: string = '/api/user/login';

  /**
   * Reovery password url.
   */
  private recoveryPasswordUrl: string = '/api/recovery-password';

  /**
   * Confirm email url.
   */
  private confirmEmailUrl: string = '/api/confirm-account';

  /**
   * @ignore
   */
  constructor(
    private httpRequestService: HttpRequestService,
  ) { }

  /**
   * Realize http request login.
   * @param body Body of request.
   * @returns Promise any.
   */
  login(body: any): Promise<any> {
    return new Promise<any>(
      (resolve, reject) => {
        this.httpRequestService
          .postRequest(this.loginUrl, body)
          .subscribe(
            response => resolve(response),
            error => reject(error),
          );
      },
    );
  }

  /**
   * Realize http request to recovery password.
   * @param email User e-mail.
   * @returns Promise any.
   */
  recoveryPassword(email: string): Promise<any> {
    return new Promise<any>(
      (resolve, reject) => {
        this.httpRequestService
          .getRequest(`${this.recoveryPasswordUrl}?user_email=${email}&profile_id=1`)
          .subscribe(
            response => resolve(response),
            error => reject(error),
          );
      },
    );
  }

  /**
   * Realize http request to resend email confirmation.
   * @param email User e-mail.
   * @returns Promise any.
   */
  resendConfirmAccountEmail(email: string): Promise<any> {
    return new Promise<any>(
      (resolve, reject) => {
        this.httpRequestService
          .postRequest(`${this.confirmEmailUrl}?user_email=${email}`, {})
          .subscribe(
            response => resolve(response),
            error => reject(error),
          );
      },
    );
  }

}
