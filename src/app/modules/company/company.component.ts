import { Component, OnInit } from '@angular/core';
import * as faker from 'faker';

/**
 * Company component.
 */
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit {

  /**
   * Companies objects.
   */
  public companies: any[] = [
    {
      companyName: faker.company.companyName(),
      responsibleName: faker.name.findName(),
      phone: faker.phone.phoneNumber(),
      services: faker.random.number(),
    },
    {
      companyName: faker.company.companyName(),
      responsibleName: faker.name.findName(),
      phone: faker.phone.phoneNumber(),
      services: faker.random.number(),
    },
    {
      companyName: faker.company.companyName(),
      responsibleName: faker.name.findName(),
      phone: faker.phone.phoneNumber(),
      services: faker.random.number(),
    },
  ];

  /**
   * Loading component.
   */
  public loading: boolean = true;

  /**
   * @ignore
   */
  constructor() { }

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
