import { Component, OnInit } from '@angular/core';
import * as faker from 'faker';
import { PaginationService } from '../../components/others/pagination/pagination.service';

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
   * Loading component.
   */
  public loading: boolean = true;

  /**
   * Current page.
   */
  public currentPage: number = 1;

  /**
   * @ignore
   */
  constructor(
    public paginationService: PaginationService,
  ) { }

  /**
   * @ignore
   */
  ngOnInit() {

    // dismiss loading
    setTimeout(_ => this.loading = false, 1000);

  }

  /**
   * Search by input.
   */
  search(input: string): void {
    console.log(input);
  }

}
