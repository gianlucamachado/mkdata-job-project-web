import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuItem } from '../menu-item.interface';

/**
 * ### Vertical Side Menu Component
 *
 * Responsible to show side menu.
 */
@Component({
  selector: 'app-vertical-side-menu',
  templateUrl: './vertical-side-menu.component.html',
  styleUrls: ['./vertical-side-menu.component.scss'],
})
export class VerticalSideMenuComponent implements OnInit {

  /**
   * User received by param.
   */
  @Input() user: any;

  /**
   * Menu items.
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
