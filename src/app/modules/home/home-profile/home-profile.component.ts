import { Component, OnInit, Input } from '@angular/core';

/**
 * ### Component Home Profile
 *
 * Show profile about user in side menu.
 */
@Component({
  selector: 'app-home-profile',
  templateUrl: './home-profile.component.html',
  styleUrls: ['./home-profile.component.scss'],
})
export class HomeProfileComponent implements OnInit {

  /**
   * User param.
   */
  @Input() user: any;

  /**
   * @ignore
   */
  constructor() { }

  /**
   * @ignore
   */
  ngOnInit() { }

}
