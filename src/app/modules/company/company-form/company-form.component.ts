import { CompanyService } from './../company.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { UtilsService } from '../../../providers/utils/utils.service';
import { Router, ActivatedRoute } from '@angular/router';

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
   * Form with data.
   */
  public companyForm: FormGroup;

  /**
   * Submit attempt variable.
   */
  public submitAttempt: boolean = false;

  /**
   * Agencies.
   */
  public agencies$: Observable<any[]>;

  /**
   * Services.
   */
  public services$: Observable<any[]>;

  /**
   * Loading component.
   */
  public loading: boolean = false;

  /**
   * Comapny id.
   */
  public company_id: string;

  /**
   * @ignore
   */
  constructor(
    public utils: UtilsService,
    private companyService: CompanyService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  /**
   * @ignore
   */
  async ngOnInit() {

    // initialize form
    this.companyForm = this.formBuilder.group({
      agency_id: ['', Validators.compose([Validators.required])],
      service_type_id: ['', Validators.compose([Validators.required])],
    });

    // get company id
    this.company_id = this.activatedRoute.snapshot.paramMap.get('company_id');

    // get agencies
    try {
      this.agencies$ = await this.companyService.getAgencies();
    } catch (e) {
      console.error(e);
    }

    // create subscribe
    this.companyForm.controls.agency_id.valueChanges.subscribe(async (value) => {

      // log value
      console.log(value);

      // if has value
      if (value) {

        // present loading
        this.loading = true;

        // get services
        try {

          // remove service type id
          this.companyForm.controls.service_type_id.setValue('');

          // get services
          this.services$ = await this.companyService.getServiceTypes(value, this.company_id);

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
    } else {
      self.submitAttempt = true;
    }
  }

  /**
   * Back to company list page.
   */
  backPage() {
    return this.router.navigate(['/administrador/empresa']);
  }

}
