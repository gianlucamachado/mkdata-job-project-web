import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { MenuItem } from '../menu-item.interface';

import { MaterializeAction } from 'angular2-materialize';

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
  constructor() { }

  /**
   * @ignore
   */
  ngOnInit() { }

}
