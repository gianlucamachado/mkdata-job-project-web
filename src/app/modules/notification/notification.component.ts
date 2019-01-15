import { ListState } from './../../classes/State.class';
import { ListControllerService } from './../../providers/utils/list-controller.service';
import { Component, OnInit } from '@angular/core';
import { PaginationService } from '../../components/others/pagination/pagination.service';
import { NotificationService } from './notification.service';

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
  * Notification list.
  */
  public notificationState: ListState<Notification> = new ListState();

  /**
   * @ignore
   */
  constructor(
    public paginationService: PaginationService,
    private notificationService: NotificationService,
    private listController: ListControllerService,
  ) { }

  /**
   * @ignore
   */
  ngOnInit() {

    this.getList();
  }

  /**
   * Get data from api.
   */
  async getList() {
    this.notificationState.loading = true;
    this.notificationState.error = false;
    this.notificationState.list = null;

    // get list with last notifications.
    // this.notificationState.allList = await this.notificationService.getLast50Notifications()
    //   .catch(error => (
    //     this.notificationState.messageError = `Erro ao buscar os dados: ${error.message}`,
    //     this.notificationState.error = true,
    //     this.notificationState.loading = false, []));

    this.notificationState.allList = [];

    // get current page.
    const pages = this.listController.setPagination(1, this.notificationState.allList);
    // set pager controller to pagination and set current page.
    this.notificationState.pager = pages.pagerController;
    this.notificationState.list = pages.currentPage;
    this.notificationState.loading = false;
  }

  /**
   * set current page.
   */
  pagination(page: number): void {
    // get current page.
    const pages = this.listController.setPagination(page, this.notificationState.allList);
    // set pager controller to pagination and set current page.
    this.notificationState.pager = pages.pagerController;
    this.notificationState.list = pages.currentPage;
  }

  /**
   * Do Search and aplly pagination.
   * @param search value searched
   */
  search(search: string) {
    // params to be searched
    const params = ['employee_name', 'service_type_description', 'agency'];
    // get filters list case have filter active else get list.
    const pages = this.listController.setSearch(search, params, this.notificationState.allList);

    // set pager controller to pagination and set current page.
    this.notificationState.pager = pages.pagerController;
    this.notificationState.list = pages.currentPage;
  }

}
