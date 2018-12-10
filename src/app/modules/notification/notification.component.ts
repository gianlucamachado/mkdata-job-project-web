import { Component, OnInit } from '@angular/core';
import * as faker from 'faker';

/**
 * Notification component.
 */
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {

  /**
   * Notification objects.
   */
  public notifications: any[] = [
    {
      description: faker.lorem.paragraph(),
    },
    {
      description: faker.lorem.paragraph(),
    },
    {
      description: faker.lorem.paragraph(),
    },
  ];

  /**
   * @ignore
   */
  constructor() { }

  /**
   * @ignore
   */
  ngOnInit() { }

  /**
   * Search by input.
   */
  search(input: string): void {
    console.log(input);
  }

}
