import { Component, OnInit } from '@angular/core';
import * as faker from 'faker';

/**
 * User component.
 */
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

  /**
   * User objects.
   */
  public users: any[] = [
    {
      photoUrl: faker.image.avatar(),
      userName: faker.name.findName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
    },
    {
      photoUrl: faker.image.avatar(),
      userName: faker.name.findName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
    },
    {
      photoUrl: faker.image.avatar(),
      userName: faker.name.findName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
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
