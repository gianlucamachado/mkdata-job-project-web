import { MaterializeAction } from 'angular2-materialize';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from '../menu-item.interface';

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
   * @ignore
   */
  constructor() { }

  /**
   * @ignore
   */
  ngOnInit() { }

}
