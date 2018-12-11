import { Component, OnInit, EventEmitter } from '@angular/core';
import * as faker from 'faker';
import { MaterializeAction } from 'angular2-materialize';
import { PaginationService } from '../../components/others/pagination/pagination.service';

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
   * Side navbar actions.
   */
  public sideNavActions = new EventEmitter<string | MaterializeAction>();

  /**
   * Side nav params.
   */
  public sideNavParams: any[] = [{ closeOnClick: true, edge: 'right' }];

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
