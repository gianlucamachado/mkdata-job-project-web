import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '../../../../../providers/form/question-base';

@Component({
  selector: 'app-dynamic-question',
  templateUrl: './dynamic-question.component.html',
  styleUrls: ['./dynamic-question.component.scss'],
})
export class DynamicQuestionComponent {

  /**
   * current question.
   */
  @Input() question: QuestionBase<any>;

  /**
   * form group
   */
  @Input() form: FormGroup;

  get isValid() { return this.form.controls[this.question.key].valid; }

}
