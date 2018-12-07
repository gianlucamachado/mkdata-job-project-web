import { Component, OnInit } from '@angular/core';
import * as faker from 'faker';

/**
 * App component.
 * @ignore
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  /**
   * Title of app.
   */
  public title = 'Report Corporate Web';

  /**
   * @ignore
   */
  constructor() { }

  /**
   * On init.
   */
  ngOnInit() {

    // set faker locale
    faker.locale = 'pt_BR';

  }

}
