import { Chart } from 'chart.js';
import { Component, OnInit } from '@angular/core';
import * as faker from 'faker';
import { UtilsService } from '../../providers/utils/utils.service';

/**
 * Report Component.
 */
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {

  /**
   * Dashboard buttons.
   */
  public buttons: any[] = [
    {
      icon: 'fas fa-th-large fa-3x',
      title: 'Serviço mais solicitado',
      subtitle: 'Lâmpada Queimada',
      color: '#e19a00',
      secondaryColor: '#a97300',
    },
    {
      icon: 'fas fa-map-marked fa-3x',
      title: 'Local mais solicitado',
      subtitle: 'Sala Esperança',
      color: '#95c22e',
      secondaryColor: '#7da226',
    },
    {
      icon: 'fas fa-store-alt fa-3x',
      title: 'Empresa que mais atendeu',
      subtitle: 'AR Reparos',
      color: '#74bcd6',
      secondaryColor: '#5e98ad',
    },
  ];

  /**
   * Loading variable
   */
  public loading: boolean = true;

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

    // loading
    setTimeout(_ => this.loading = false, 1000);

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
    const type: string = 'line';

    // data chart
    const data1: any = { labels, datasets: this.utilsService.getChartDatasets() };

    // create config
    const config1 = { options, type, data: data1 };

    // initilize chart one
    config1.options.title.text = 'Número de Solicitações';
    config1.data.datasets[0].data = [
      { x: faker.random.number({ min: 0, max: 200 }), y: faker.random.number({ min: 0, max: 200 }) },
      { x: faker.random.number({ min: 0, max: 200 }), y: faker.random.number({ min: 0, max: 200 }) },
      { x: faker.random.number({ min: 0, max: 200 }), y: faker.random.number({ min: 0, max: 200 }) },
      { x: faker.random.number({ min: 0, max: 200 }), y: faker.random.number({ min: 0, max: 200 }) },
      { x: faker.random.number({ min: 0, max: 200 }), y: faker.random.number({ min: 0, max: 200 }) },
      { x: faker.random.number({ min: 0, max: 200 }), y: faker.random.number({ min: 0, max: 200 }) },
      { x: faker.random.number({ min: 0, max: 200 }), y: faker.random.number({ min: 0, max: 200 }) },
    ];

    // log chart 1 config
    return new Promise(resolve => resolve(new Chart('canvas1', config1)));
  }

  /**
   * Create chart.
   */
  async createChartSchedules() {

    // labels
    const labels: string[] = [
      faker.commerce.product(),
      faker.commerce.product(),
      faker.commerce.product(),
    ];

    // options
    const options: any = {};

    // chart type
    const type: string = 'pie';

    // data chart
    const data2: any = { labels, datasets: this.utilsService.getChartDatasets() };

    // create config
    const config2 = { options, type, data: data2 };

    // initilize chart one
    config2.data.datasets[0].data = [
      faker.random.number({ min: 0, max: 200 }),
      faker.random.number({ min: 0, max: 200 }),
      faker.random.number({ min: 0, max: 200 }),
    ];

    // log chart 1 config
    return new Promise(resolve => resolve(new Chart('canvas2', config2)));
  }

}
