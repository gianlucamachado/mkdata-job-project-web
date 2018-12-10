import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilsService } from '../../../providers/utils/utils.service';
import * as faker from 'faker';

/**
 * Service form component.
 */
@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.scss'],
})
export class ServiceFormComponent implements OnInit {

  /**
   * Form received by param.
   */
  @Input() modalForm: FormGroup;

  /**
   * Submit attempt variable.
   */
  @Input() submitAttempt: boolean = false;

  /**
   * Edit mode.
   */
  @Input() editMode: boolean = false;

  /**
   * Close modal event.
   */
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Create service event.
   */
  @Output() onCreate: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  /**
   * Update service event.
   */
  @Output() onUpdate: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  /**
   * Upload percent.
   */
  public uploadPercent: number;

  /**
   * @ignore
   */
  constructor(
    public utils: UtilsService,
  ) { }

  /**
   * @ignore
   */
  ngOnInit() { }

  /**
   * Validate form.
   * @param form Form to validate.
   */
  validate(form: FormGroup): void {
    // tslint:disable-next-line:no-this-assignment
    const self = this;

    // validate
    if (form.valid) {
      self.submitAttempt = false;
      (self.editMode) ? self.onUpdate.emit(form) : self.onCreate.emit(form);
    } else {
      self.submitAttempt = true;
    }
  }

  /**
   * Receivechanges on input file.
   * @param event Event from input.
   */
  async onChangeInputPicture(event: any): Promise<void> {
    // verify files lenght
    if (event.target.files.lenght === 0) return;

    // get event params
    const file = event.target.files[0];

    // log file
    console.log(file);

    // add faker image
    this.modalForm.controls.icon.setValue(faker.image.business());
  }

}
