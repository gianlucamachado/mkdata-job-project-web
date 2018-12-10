import { environment } from '../../../environments/environment';
import { TokenService } from '../token/token.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, retry } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

/**
 * Http Request Provider
 */
@Injectable()
export class HttpRequestService {

  /**
   * @ignore
   */
  constructor(
    private http: HttpClient,
    public tokenProvider: TokenService,
  ) { }

  /**
   * Get request.
   * @param url Url to request.
   */
  getRequest(url: string, responseType: any = {}): Observable<any> {
    return this.http.get(environment.api_url + url, responseType)
      .pipe(
        tap(data => console.log(data)),
        retry(3),
      );
  }

  /**
   * Post request.
   * @param url Url to request.
   * @param body Body to request.
   */
  postRequest(url: string, body: any): Observable<any> {
    return this.http.post(environment.api_url + url, body)
      .pipe(
        tap(data => console.log(data)),
        retry(3),
      );
  }

  /**
   * Put request.
   * @param url Url to request.
   * @param body Body to request.
   */
  putRequest(url: string, body: any): Observable<any> {

    // create request options
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return this.http.put(environment.api_url + url, body, options)
      .pipe(
        tap(data => console.log(data)),
        retry(3),
      );
  }

  /**
   * Post request with authorization header.
   * @param url Url to do request.
   * @param data Data of the body of request.
   * @param type Type of request.
   * @returns Promise Request or Response return.
   */
  postRequestWithAuthorization(url: string, body: any, contentType: string = 'application/json', replaceToken?: string): Observable<any> {
    // get token
    const token: string = this.tokenProvider.getToken();

    // create request options
    const options = {
      headers: {
        'Content-Type': contentType,
        Authorization: (replaceToken) ? replaceToken : token,
      },
    };

    // return
    return this.http.post(environment.api_url + url, body, options)
      .pipe(
        tap(data => console.log(data)),
        retry(3),
      );
  }

  /**
  * Get request with authorization header.
  * @param url Url to do request.
  * @returns Promise Request or Response return.
  */
  getRequestWithAuthorization(url: string, contentType: string = 'application/json', replaceToken?: string): Observable<any> {

    // get token
    const token: string = this.tokenProvider.getToken();

    // create request options
    const options = {
      headers: {
        'Content-Type': contentType,
        Authorization: (replaceToken) ? replaceToken : token,
      },
    };

    // return
    return this.http.get(environment.api_url + url, options)
      .pipe(
        tap(data => console.log(data)),
        retry(3),
      );
  }

  /**
   * Put request with authorization header.
   * @param url Url to do request.
   * @returns Promise Request or Response return.
   */
  putRequestWithAuthorization(url: string, body: any, contentType: string = 'application/json', replaceToken?: string): Observable<any> {

    // get token
    const token: string = this.tokenProvider.getToken();

    // create request options
    const options = {
      headers: {
        'Content-Type': contentType,
        Authorization: (replaceToken) ? replaceToken : token,
      },
    };

    // return
    return this.http.put(environment.api_url + url, body, options)
      .pipe(
        tap(data => console.log(data)),
        retry(3),
      );
  }

}
