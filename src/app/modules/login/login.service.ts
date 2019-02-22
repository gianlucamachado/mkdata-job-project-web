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
  private loginUrl: string = '/login';

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
            response => resolve(response.headers.get('Authorization')),
            error => reject(error),
          );
      },
    );
  }

}
