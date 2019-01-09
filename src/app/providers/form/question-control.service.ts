import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { QuestionBase } from './question-base';

@Injectable()
export class QuestionControlService {
  constructor() { }

  /**
   * Create a dynamic form.
   * @param questions questions to be form controls.
   */
  toFormGroup(questions: QuestionBase<any>[]) {
    const group: any = {};

    // tslint:disable-next-line:ter-arrow-parens
    questions.forEach(question => {
      // not add headers to form
      if (!question.header) {
        // create form controls
        group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
          : new FormControl(question.value || '');
      }
    });
    return new FormGroup(group);
  }
}
