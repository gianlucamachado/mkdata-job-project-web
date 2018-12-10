import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilsService } from '../../../providers/utils/utils.service';
import { Observable } from 'rxjs/Observable';

/**
 * Location form component.
 */
@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss'],
})
export class LocationFormComponent implements OnInit {

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
   * Agencies.
   */
  public agencies$: Observable<any> = new Observable((observer) => {
    observer.next([
      { name: 500, value: 500 },
      { name: 200, value: 200 },
      { name: 600, value: 600 },
    ]);
    observer.complete();
  });

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

}
