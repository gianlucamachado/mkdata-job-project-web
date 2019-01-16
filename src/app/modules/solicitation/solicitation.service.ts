import { Injectable } from '@angular/core';
import { HttpRequestService } from '../../providers/http-request/http-request.service';

@Injectable()
export class SolicitationService {

  /**
   * Company endpoint.
   */
  private baseUrl = '/api/request';

  /**
   * comment url.
   */
  private commentUrl: string = '/api/comment';

  /**
   * request status history url.
   */
  private requestStatusHistoryUrl: string = '/api/request-status-history';

  /**
   * @ignore
   */
  constructor(
    private httpRequestService: HttpRequestService,
  ) { }

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

  /**
   * Realize http request and get request by id.
   * @returns Promise any.
   */
  getRequest(id: string): Promise<any> {
    return new Promise<any>(
      (resolve, reject) => {
        this.httpRequestService
          .getRequestWithAuthorization(`${this.baseUrl}/find/${id}`)
          .subscribe(
            response => resolve(response),
            error => reject(error),
          );
      },
    );
  }

  /**
   * Realize http request and create new comment.
   * @returns Promise any.
   */
  createComment(body: any): Promise<any> {
    return new Promise<any>(
      (resolve, reject) => {
        this.httpRequestService
          .putRequestWithAuthorization(this.commentUrl, body)
          .subscribe(
            response => resolve(response),
            error => reject(error),
          );
      },
    );
  }

  /**
   * Realize http request and create request status history.
   * @returns Promise any.
   */
  changeStatus(body: any): Promise<any> {
    return new Promise<any>(
      (resolve, reject) => {
        this.httpRequestService
          .putRequestWithAuthorization(this.requestStatusHistoryUrl, body)
          .subscribe(
            response => resolve(response),
            error => reject(error),
          );
      },
    );
  }

}
