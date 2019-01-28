import { ListState } from './../../classes/State.class';
import { ListControllerService } from './../../providers/utils/list-controller.service';
import { Component, OnInit } from '@angular/core';
import { PaginationService } from '../../components/others/pagination/pagination.service';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';

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
    private router: Router,
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
    this.notificationState.allList = await this.notificationService.getLast50Notifications()
      .catch(error => (
        this.notificationState.messageError = `Erro ao buscar os dados: ${error.message}`,
        this.notificationState.error = true,
        this.notificationState.loading = false, []));

    // get current page.
    const pages = this.listController.setPagination(1, this.notificationState.allList);
    // set pager controller to pagination and set current page.
    this.notificationState.pager = pages.pagerController;
    this.notificationState.list = pages.currentPage;
    this.notificationState.loading = false;
  }

  /**
   * Set current page.
   */
  pagination(page: number): void {

    // Verify if exist allListSearched.
    // case not exist -> Verify if exist allListFiltered
    // case not exist -> get allList
    const list = (this.notificationState.allListSearched) ?
      this.notificationState.allListSearched :
      (this.notificationState.allListFiltered) ?
        this.notificationState.allListFiltered : this.notificationState.allList;

    const pages = this.listController.setPagination(page, list);
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
    const params = ['headings.pt'];

    // get filters list case have filter active else get list.
    const list = (this.notificationState.allListFiltered) ? this.notificationState.allListFiltered : this.notificationState.allList;
    const { pagerController, currentPage, allListSearched } = this.listController.setSearch(search, params, list);

    // set pager controller to pagination, current page and searched list.
    this.notificationState.allListSearched = allListSearched;
    this.notificationState.pager = pagerController;
    this.notificationState.list = currentPage;
  }

  /**
   * Open notification url.
   */
  openNotification(url: string) {

    // open
    if (url) {
      this.router.navigate([url]);
    }

  }

}
