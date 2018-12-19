import { MaterializeAction } from 'angular2-materialize';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from '../menu-item.interface';
import { Router } from '@angular/router';
import { StorageService } from '../../../providers/storage/storage.service';
import { TokenService } from '../../../providers/token/token.service';

/**
 * Component Home Navbar
 *
 * This component is a principal navbar used in home.
 */
@Component({
  selector: 'app-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.scss'],
})
export class HomeNavbarComponent implements OnInit {

  /**
   * Side navbar actions.
   */
  public sideNavActions = new EventEmitter<string | MaterializeAction>();

  /**
   * Side nav params.
   */
  public sideNavParams: any[] = [{ closeOnClick: true, edge: 'left' }];

  /**
   * User received by param.
   */
  @Input() user: any;

  /**
   * Menu items received by param.
   */
  @Input() menu: MenuItem[];

  /**
   * On click output.
   */
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Loading present variable.
   */
  public loading: boolean = false;

  /**
   * @ignore
   */
  constructor(
    private router: Router,
    private storageService: StorageService,
    private tokenService: TokenService,
  ) { }

  /**
   * @ignore
   */
  ngOnInit() { }

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
