import { Component, OnInit } from '@angular/core';
import * as faker from 'faker';

/**
 * Solicitation component.
 */
@Component({
  selector: 'app-solicitation',
  templateUrl: './solicitation.component.html',
  styleUrls: ['./solicitation.component.scss'],
})
export class SolicitationComponent implements OnInit {

  /**
   * Solicitation objects.
   */
  public solicitations: any[] = [
    {
      photoUrl: faker.image.avatar(),
      displayName: faker.name.findName(),
      location: faker.commerce.department(),
      service: faker.commerce.product(),
      status: faker.random.boolean(),
    },
    {
      photoUrl: faker.image.avatar(),
      displayName: faker.name.findName(),
      location: faker.commerce.department(),
      service: faker.commerce.product(),
      status: faker.random.boolean(),
    },
    {
      photoUrl: faker.image.avatar(),
      displayName: faker.name.findName(),
      location: faker.commerce.department(),
      service: faker.commerce.product(),
      status: faker.random.boolean(),
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
