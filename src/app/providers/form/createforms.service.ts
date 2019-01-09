import { Injectable } from '@angular/core';

import { QuestionBase } from './question-base';
import { RadioBoxQuestion } from './question-radiobox';
import { TextboxQuestion } from './question-textbox';
import { HeaderQuestion } from './question-header';
import { SwitchQuestion } from './question-switch';

@Injectable()
export class CreateformsService {

  constructor(
  ) { }

  /**
   * get all fields to create Sale filter.
   */
  getSaleCompanyControls() {
    const controls: QuestionBase<any>[] = [

      new HeaderQuestion({
        key: 'timer',
        label: 'Período',
        order: 1,
      }),

      new TextboxQuestion({
        key: 'init_date',
        label: 'Data Inicial',
        value: '',
        required: false,
        order: 2,
        placeholder: '08/11/2018',
        mask: '00/00/0000',
        className: ['input-filter-date', 'right'],
      }),

      new TextboxQuestion({
        key: 'finish_date',
        label: 'Data Final',
        value: '',
        required: false,
        order: 3,
        placeholder: '08/11/2018',
        mask: '00/00/0000',
        className: ['input-filter-date', 'right'],
      }),
    ];

    return controls.sort((a, b) => a.order - b.order);
  }

  /**
   * get all fields to create company filter.
   */
  getCompanyControls() {
    const controls: QuestionBase<any>[] = [

      new SwitchQuestion({
        key: 'comp_city',
        label: 'Cidade',
        value: false,
        required: false,
        order: 1,
      }),

      new SwitchQuestion({
        key: 'comp_state',
        label: 'Estado',
        value: false,
        required: false,
        order: 2,
      }),
    ];

    return controls.sort((a, b) => a.order - b.order);
  }

}
