import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class HomeGuardService implements CanActivate {

  /**
   * @ignore
   */
  constructor() { }

  /**
   * Can activated this page.
   */
  canActivate(): boolean {
    return true;
  }

}
