import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';

import { UtilsService } from '../../providers/utils/utils.service';
import { DATE_PICKER_PARAMS } from '../../providers/constants';

import { Chart } from 'chart.js';
import * as faker from 'faker';
import { MaterializeAction } from 'angular2-materialize';
import { ReportService } from './report.service';
import { SweetMessageComponent } from '../../components/others/sweet-message/sweet-message.component';

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
      color: '#e19a00',
      secondaryColor: '#a97300',
    },
    {
      icon: 'fas fa-map-marked fa-3x',
      title: 'Local mais solicitado',
      color: '#95c22e',
      secondaryColor: '#7da226',
    },
    {
      icon: 'fas fa-store-alt fa-3x',
      title: 'Empresa que mais atendeu',
      color: '#74bcd6',
      secondaryColor: '#5e98ad',
    },
  ];

  /**
   * Date form group
   * with start and end controls.
   */
  public dateForm: FormGroup;

  /**
   * Params to date picker.
   */
  public dataParams = DATE_PICKER_PARAMS;

  /**
   * Loading variable
   */
  public loading: boolean = true;

  /**
   * Action for start datepicker
   */
  public startDateActions = new EventEmitter<string | MaterializeAction>();

  /**
   * Action for end datepicker
   */
  public endDateActions = new EventEmitter<string | MaterializeAction>();

  /**
   * Swal options.
   */
  public swalOptions: any = {
    title: '',
    content: '',
    button: 'Entendi',
  };

  /**
   * View message child.
   */
  @ViewChild(SweetMessageComponent) messageComponent: SweetMessageComponent;

  /**
   * Toast actions.
   */
  toastActions = new EventEmitter<string | MaterializeAction>();

  /**
   * @ignore
   */
  constructor(
    private utilsService: UtilsService,
    private reportService: ReportService,
    private fb: FormBuilder,
  ) { }

  /**
   * @ignore
   */
  async ngOnInit() {

    // loading
    setTimeout(_ => this.loading = false, 1000);

    // create form
    this.dateForm = this.createForm();
    // get report data.
    this.getData();

    // create chart one
    this.createChartUser();

    // create chart one
    this.createChartSchedules();

  }

  /**
   * Get initial data.
   */
  async getData() {
    const date = await this.reportService.getReportBydate('start=1999-01-01&end=9999-01-01')
      .catch(err => console.error(err));

    this.setButtons(date);
  }

  /**
   * Add buttons data.
   */
  setButtons({ mostRequestedService, mostRequestedLocation, companyThatMostAttended }) {
    this.buttons = [
      {
        icon: 'fas fa-th-large fa-3x',
        title: 'Serviço mais solicitado',
        subtitle: mostRequestedService.service_type_description,
        color: '#e19a00',
        secondaryColor: '#a97300',
      },
      {
        icon: 'fas fa-map-marked fa-3x',
        title: 'Local mais solicitado',
        subtitle: mostRequestedLocation.environment_description,
        color: '#95c22e',
        secondaryColor: '#7da226',
      },
      {
        icon: 'fas fa-store-alt fa-3x',
        title: 'Empresa que mais atendeu',
        subtitle: companyThatMostAttended.company_fantasy_name,
        color: '#74bcd6',
        secondaryColor: '#5e98ad',
      },
    ];
  }

  // Getters.
  get start() { return this.dateForm.get('start'); }
  get end() { return this.dateForm.get('end'); }

  /**
   * Create formGroup.
   */
  createForm() {
    return this.fb.group({
      start: ['', Validators.required],
      end: ['', Validators.required],
    });
  }

  /**
   * Create chart.
   */
  async createChartUser() {

    // tslint:disable-next-line:no-this-assignment
    const self = this;

    // labels
    const labels: string[] = self.utilsService.getLastSixMonths();

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

  /**
   * Submit date form.
   * @param form dateForm.
   */
  async onSubmit(form: FormGroup) {
    if (form.valid) {

      try {
        this.buttons.map(button => delete button['subtitle']);
        // get start and end date.
        let { start, end } = form.getRawValue();
        // adjust start date
        start = this.adjustDate(start);
        // adjust end date
        end = this.adjustDate(end);

        // get report.
        const data = await this.reportService.getReportBydate(`start=${start}&end=${end}`);

        // set buttons data.
        this.setButtons(data);

      } catch (error) {
        console.error(error);
        this.swalOptions.title = 'Não foi possível realizar a busca.';
        this.swalOptions.content = error.message;
        this.swalOptions.button = 'Ok';
        this.messageComponent.show();
      }
    } else {
      console.error('Form inválido');
      console.log(form);
      this.toastActions.emit('toast');
    }
  }

  /**
   * Return data like a year-month-day of data.
   * @param date date string.
   */
  adjustDate(date: string) {
    const day = date.slice(0, 2);
    const month = date.slice(3, 5);
    const year = date.slice(6);
    return `${year}-${month}-${day}`;
  }

  /**
   * Open date picker
   * 1 - open start date picker.
   * 2 - open end date picker.
   */
  openDatePicker(param: number) {
    switch (param) {
      case 1:
        // actions are open or close
        this.startDateActions.emit({ action: 'pickadate', params: ['open'] });
        break;
      case 2:
        // actions are open or close
        this.endDateActions.emit({ action: 'pickadate', params: ['open'] });
        break;
    }
  }

}
