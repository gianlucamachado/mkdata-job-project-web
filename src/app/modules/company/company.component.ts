import { Component, OnInit, EventEmitter } from '@angular/core';
import * as faker from 'faker';
import { MaterializeAction } from 'angular2-materialize';
import { PaginationService } from '../../components/others/pagination/pagination.service';

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
   * Side navbar actions.
   */
  public sideNavActions = new EventEmitter<string | MaterializeAction>();

  /**
   * Side nav params.
   */
  public sideNavParams: any[] = [{ closeOnClick: true, edge: 'right' }];

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

  /**
   * Close filter menu.
   */
  closeFilterMenu(): void {
    // tslint:disable-next-line:no-this-assignment
    const self = this;

    // emit event to close modal
    self.sideNavActions.emit({ action: 'sideNav', params: ['hide'] });
  }

}
