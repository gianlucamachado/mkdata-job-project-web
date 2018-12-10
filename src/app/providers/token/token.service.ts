import { Injectable } from '@angular/core';
import * as jwtDecode from 'jwt-decode';

/**
 * Token Provider
 *
 * Provide token method
 */
@Injectable()
export class TokenService {

  /**
   * Token value
   */
  private token: string;

  /**
   * @ignore
   */
  constructor() { }

  /**
   * Get setted token.
   * @returns A string.
   */
  getToken(): string {
    return this.token;
  }

  /**
   * Set token
   */
  setToken(token: string): void {
    this.token = token;
  }

  getDataToken(): any {
    return jwtDecode(this.token);
  }

}
