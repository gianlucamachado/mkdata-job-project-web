import { DashboardService } from './dashboard.service';
import { UtilsService } from './../../providers/utils/utils.service';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import * as faker from 'faker';

/**
 * Dashboard component.
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  /**
   * Dashboard buttons.
   */
  public buttons: any[] = [
    {
      icon: 'far fa-calendar-alt fa-3x',
      title: 'Solicitações',
      count: 0,
      color: '#628d9a',
      secondaryColor: '#34606c',
    },
    {
      icon: 'fas fa-user fa-3x',
      title: 'Solicitações Resolvidas',
      count: 0,
      color: '#a7be2b',
      secondaryColor: '#7a9318',
    },
    {
      icon: 'fas fa-users fa-3x',
      title: 'Solicitações Pendentes',
      count: 0,
      color: '#ea4433',
      secondaryColor: '#ca302d',
    },
    {
      icon: 'fas fa-suitcase fa-3x',
      title: 'Usuários',
      count: 0,
      color: '#057fbb',
      secondaryColor: '#0d54a2',
    },
  ];

  /**
   * Loading component.
   */
  public loading: boolean = true;

  /**
   * Show error.
   */
  public errorLoadData = {
    error: false,
    message: '',
  };

  /**
   * @ignore
   */
  constructor(
    private utilsService: UtilsService,
    private dashboardService: DashboardService,
  ) { }

  /**
   * @ignore
   */
  async ngOnInit() {

    this.getData();
  }

  /**
   * Get dashboard data.
   */
  async getData() {
    try {
      this.loading = true;

      const data = await this.dashboardService.getDashboardData();

      // create chart
      this.createChartUser(data['chart'].employees);
      this.createChartSchedules(data['chart'].requests);

      // set buttons data.
      this.buttons[0].count = data['quantity_request'];
      this.buttons[1].count = data['quantity_request_resolved'];
      this.buttons[2].count = data['quantity_request_pending'];
      this.buttons[3].count = data['quantity_employee'];
      this.loading = false;
      this.errorLoadData.error = false;

    } catch (error) {
      console.error(error);
      this.loading = false;
      this.errorLoadData.error = true;
      this.errorLoadData.message = (error.message) ? error.message : 'Não foi possivel carregar os dados.';
    }
  }

  /**
   * Create chart.
   */
  async createChartUser(employees) {

    // tslint:disable-next-line:no-this-assignment
    const self = this;

    // labels
    const labels: string[] = self.utilsService.getLastSixMonths();

    // options
    const options: any = this.utilsService.getChartOptions();

    // chart type
    const type: string = 'bar';

    // data chart
    const data1: any = { labels, datasets: this.utilsService.getChartDatasets() };

    // create config
    const config1 = { options, type, data: data1 };

    // initilize chart one
    config1.options.title.text = 'Número de Solicitações';
    config1.data.datasets[0].data = employees.values.reverse();

    // log chart 1 config
    return new Promise(resolve => resolve(new Chart('canvas1', config1)));
  }

  /**
   * Create chart.
   */
  async createChartSchedules(requests) {

    // tslint:disable-next-line:no-this-assignment
    const self = this;

    // labels
    const labels: string[] = self.utilsService.getLastSixMonths();

    // options
    const options: any = this.utilsService.getChartOptions();

    // chart type
    const type: string = 'bar';

    // data chart
    const data2: any = { labels, datasets: this.utilsService.getChartDatasets() };

    // create config
    const config2 = { options, type, data: data2 };

    // initilize chart one
    config2.options.title.text = 'Colaboradores';
    config2.data.datasets[0].data = requests.values.reverse();

    // log chart 1 config
    return new Promise(resolve => resolve(new Chart('canvas2', config2)));
  }

}
