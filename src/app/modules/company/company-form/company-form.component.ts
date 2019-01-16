import { CompanyService } from './../company.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { UtilsService } from '../../../providers/utils/utils.service';

/**
 * Company form component.
 */
@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss'],
})
export class CompanyFormComponent implements OnInit {

  /**
   * Form received by param.
   */
  @Input() modalForm: FormGroup;

  /**
   * Submit attempt variable.
   */
  @Input() submitAttempt: boolean = false;

  /**
   * Close modal event.
   */
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Update service event.
   */
  @Output() onUpdate: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  /**
   * Agencies.
   */
  public agencies$: Observable<any[]>;

  /**
   * services.
   */
  public services$: Observable<any[]>;

  /**
   * Loading component.
   */
  public loading: boolean = false;

  /**
   * @ignore
   */
  constructor(
    public utils: UtilsService,
    private companyService: CompanyService,
  ) { }

  /**
   * @ignore
   */
  async ngOnInit() {

    // get agencies
    try {
      this.agencies$ = await this.companyService.getAgencies();
    } catch (e) {
      console.error(e);
    }

    // create subscribe
    this.modalForm.controls.agency_id.valueChanges.subscribe(async (value) => {

      // log value
      console.log(value);

      // if has value
      if (value) {

        // present loading
        this.loading = true;

        // get services
        try {

          // remove service type id
          this.modalForm.controls.service_type_id.setValue('');

          // get services
          this.services$ = await this.companyService.getServiceTypes(value);

        } catch (e) {

          // log error
          console.error(e);

        }

        // dismiss loading
        this.loading = false;

      }

    });

  }

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
      self.onUpdate.emit(form);
    } else {
      self.submitAttempt = true;
    }
  }

}
