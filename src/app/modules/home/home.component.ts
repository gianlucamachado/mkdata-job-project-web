import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItem } from './menu-item.interface';
import { HomeService } from './home.service';
import { StorageService } from '../../providers/storage/storage.service';
import { TokenService } from '../../providers/token/token.service';
import { OneSignalService } from './one-signal.service';
import * as jwtDecode from 'jwt-decode';

/**
 * Home Component.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  /**
   * Loading present variable.
   */
  public loading: boolean = false;

  /**
   * Menu Itens.
   */
  public menu: MenuItem[] = [
    { icon: 'fas fa-users', label: 'Clientes', href: '/administrador/empresa', isActive: true },
    { icon: 'fas fa-sign-out-alt', label: 'Sair', href: '', isActive: false },
  ];

  /**
   * Selected menu item.
   */
  public selected: number = 0;

  /**
   * User object.
   */
  public user: any;

  /**
   * @ignore
   */
  constructor(
    public router: Router,
    public homeService: HomeService,
    private storageService: StorageService,
    private tokenService: TokenService,
    private oneSignalService: OneSignalService,
  ) { }

  /**
   * @ignore
   */
  async ngOnInit() {
    // tslint:disable-next-line:no-this-assignment
    const self = this;

    // initialize notifications
    if (location.protocol === 'https:') {
      this.oneSignalService.init();
    }

    // set user default.
    this.user = {
      admin_name: 'Admin',
      admin_photo_url: 'https://trello-attachments.s3.amazonaws.com/5b58fcf29a311ba8e8a12679/5c0fbda6df91812808f83c26/7002108d60ddb6698626b5954f168d29/Ativo_1.png',
      user_email: 'admin@mkdata.com',
    };

    try {

      // get token
      const token = await this.storageService.retrieve('token');

      // log token
      console.log('token', token);

      // decoded token
      const decodedToken: any = jwtDecode(token);

      // set user email
      this.user.user_email = decodedToken.sub;

    } catch (e) {

      // log error
      console.error(e);

    }

    // get active page
    await self.getActivePage();

  }

  /**
   * Get active page.
   */
  getActivePage(): Promise<any> {
    // tslint:disable-next-line:no-this-assignment
    const self = this;

    // get active route
    // by route verify user is company or master admin
    const route = self.router.url;

    // return
    return new Promise((resolve) => {
      self.menu.forEach((item, index) => {

        // set active with false
        item.isActive = false;

        // if is active route set true
        if (route === item.href) {
          item.isActive = true;
          self.selected = index;
        }

      });

      resolve();
    });
  }

  /**
   * Change router page param.
   * @param item Menu item clicked.
   */
  changeRoute(item: MenuItem, index: number): void {
    // tslint:disable-next-line:no-this-assignment
    const self = this;

    // if empty
    if (!item.href) {
      this.logout();
      return;
    }

    // change route
    self.router.navigate([item.href]);

    // set true selected
    item.isActive = true;

    // set false in active page and change
    self.menu[self.selected].isActive = false;

    // set new index
    self.selected = index;
  }

  /**
   * Logout
   */
  async logout() {
    // show loading
    this.loading = true;

    // set token was null
    await this.storageService.removeItem('token');

    // set null on token service
    await this.tokenService.setToken(null);

    // dismiss to login page
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['/']);
      // tslint:disable-next-line:align
    }, 500);
  }

}
