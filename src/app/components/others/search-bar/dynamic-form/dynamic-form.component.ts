import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SwalComponent, SwalPartialTargets } from '@toverux/ngx-sweetalert2';
import { QuestionBase } from '../../../../providers/form/question-base';
import { QuestionControlService } from '../../../../providers/form/question-control.service';
import { UtilsService } from '../../../../providers/utils/utils.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {

  /**
   * questions to create form.
   */
  @Input() questions: QuestionBase<any>[] = [];

  /**
   * Emitt a form value.
   */
  @Output() formValue: EventEmitter<any> = new EventEmitter();

  /**
   * Emitt keys to filters selected.
   */
  @Output() formValueKeys: EventEmitter<string[]> = new EventEmitter<string[]>();

  /**
   * Swall to show messages.
   */
  @ViewChild('swalShowMessage') private swalShowMessage: SwalComponent;

  /**
   * Form Group.
   */
  form: FormGroup;
  payLoad = '';

  constructor(
    private questionService: QuestionControlService,
    public readonly swalTargets: SwalPartialTargets,
    private utilsService: UtilsService,
  ) { }

  /**
   * @ignore
   */
  ngOnInit() {
    this.form = this.questionService.toFormGroup(this.questions);
  }

  /**
   * Submit form
   */
  onSubmit(form: FormGroup) {

    // verify if form is valid
    if (form.valid) {
      // Form values.
      const formValues = form.getRawValue();

      // case exist init and finish data filds.
      if (form.get('init_date') && form.get('finish_date') && form.get('init_date').value && form.get('finish_date').value) {
        // tslint:disable:variable-name
        const init_date = this.adjustDate(formValues['init_date']);
        const finish_date = this.adjustDate(formValues['finish_date']);

        // Verify initial date
        // if (this.validateDate(init_date)) {
        //   this.utilsService.showSwall(this.swalShowMessage, 'error', 'Erro ao aplicar o filtro!', 'Data inicial é inválida.');
        //   return;
        // }
        // // Verify finish date
        // if (this.validateDate(finish_date)) {
        //   this.utilsService.showSwall(this.swalShowMessage, 'error', 'Erro ao aplicar o filtro!', 'Data Final é inválida.');
        //   return;
        // }
        // // verify if finish if less then init data.
        // if (new Date(finish_date[2], finish_date[1] - 1, finish_date[0]) < new Date(init_date[2], init_date[1] - 1, init_date[0])) {
        //   this.utilsService.showSwall(this.swalShowMessage, 'error', 'Erro ao aplicar o filtro!', 'A data final deve ser maior que a data inicial.');
        //   return;
        // }

        // change dates to ISO formact.
        formValues['init_date'] = new Date(init_date[2], init_date[1] - 1, init_date[0]).toISOString();
        formValues['finish_date'] = new Date(finish_date[2], finish_date[1] - 1, finish_date[0]).toISOString();
      }

      // Emit form value.
      this.formValue.emit(formValues);

      // get key of only filters seleted, with value iquals TRUE.
      // tslint:disable-next-line:no-shadowed-variable
      const key = Object.keys(formValues).filter(key => formValues[key] === true);

      this.formValueKeys.emit(key);

    } else {
      console.log('form invalido');
      console.log(form);
    }
  }

  /**
   * Return a array with [day,month,year] of data.
   * @param date date string.
   */
  adjustDate(date: string) {
    const newDate = [];
    const day = date.slice(0, 2);
    const month = date.slice(2, 4);
    const year = date.slice(4);
    newDate.push(day, month, year);
    return newDate;
  }

  /**
   * Validade date
   * @param date date array (day,month,year).
   */
  validateDate(date: string[]) {
    return (
      date[0] < '32' && date[0] > '0' &&
      date[1] < '13' && date[1] > '0' &&
      date[2] > '1000') ? false : true;
  }

  /**
   * clear form.
   */
  clearFilter() {
    this.form.reset();
    this.formValueKeys.emit([]);
    this.formValue.emit(null);
  }
}
