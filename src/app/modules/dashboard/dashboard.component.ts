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
      count: faker.random.number({ min: 0, max: 200 }),
      color: '#628d9a',
      secondaryColor: '#34606c',
    },
    {
      icon: 'fas fa-user fa-3x',
      title: 'Solicitações Resolvidas',
      count: faker.random.number({ min: 0, max: 200 }),
      color: '#a7be2b',
      secondaryColor: '#7a9318',
    },
    {
      icon: 'fas fa-users fa-3x',
      title: 'Solicitações Pendentes',
      count: faker.random.number({ min: 0, max: 200 }),
      color: '#ea4433',
      secondaryColor: '#ca302d',
    },
    {
      icon: 'fas fa-suitcase fa-3x',
      title: 'Usuários',
      count: faker.random.number({ min: 0, max: 200 }),
      color: '#057fbb',
      secondaryColor: '#0d54a2',
    },
  ];

  /**
   * @ignore
   */
  constructor(
    private utilsService: UtilsService,
  ) { }

  /**
   * @ignore
   */
  async ngOnInit() {

    // create chart one
    await this.createChartUser();

    // create chart one
    await this.createChartSchedules();

  }

  /**
   * Create chart.
   */
  async createChartUser() {

    // tslint:disable-next-line:no-this-assignment
    const self = this;

    // labels
    const labels: string[] = self.utilsService.getLastSevenMonths();

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
    config1.data.datasets[0].data = [
      faker.random.number({ min: 0, max: 200 }),
      faker.random.number({ min: 0, max: 200 }),
      faker.random.number({ min: 0, max: 200 }),
      faker.random.number({ min: 0, max: 200 }),
      faker.random.number({ min: 0, max: 200 }),
      faker.random.number({ min: 0, max: 200 }),
      faker.random.number({ min: 0, max: 200 }),
    ];

    // log chart 1 config
    return new Promise(resolve => resolve(new Chart('canvas1', config1)));
  }

  /**
   * Create chart.
   */
  async createChartSchedules() {

    // tslint:disable-next-line:no-this-assignment
    const self = this;

    // labels
    const labels: string[] = self.utilsService.getLastSevenMonths();

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
    config2.data.datasets[0].data = [
      faker.random.number({ min: 0, max: 200 }),
      faker.random.number({ min: 0, max: 200 }),
      faker.random.number({ min: 0, max: 200 }),
      faker.random.number({ min: 0, max: 200 }),
      faker.random.number({ min: 0, max: 200 }),
      faker.random.number({ min: 0, max: 200 }),
      faker.random.number({ min: 0, max: 200 }),
    ];

    // log chart 1 config
    return new Promise(resolve => resolve(new Chart('canvas2', config2)));
  }

}
