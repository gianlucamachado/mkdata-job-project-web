import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { StorageService } from './../../../providers/storage/storage.service';
import { TokenService } from '../../../providers/token/token.service';

@Injectable()
export class HomeGuardService implements CanActivate {

  /**
   * @ignore
   */
  constructor(
    private storageService: StorageService,
    private tokenService: TokenService,
  ) { }

  /**
   * Can activated this page.
   */
  async canActivate(): Promise<any> {
    try {
      // get token
      const token = await this.storageService.retrieve('token');
      // set token on provider
      this.tokenService.setToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }

}
