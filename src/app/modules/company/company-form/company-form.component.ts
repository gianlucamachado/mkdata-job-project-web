import { CompanyService } from './../company.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { UtilsService } from '../../../providers/utils/utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SweetMessageComponent } from '../../../components/others/sweet-message/sweet-message.component';

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
   * Will save objects to save on database.
   */
  public objectsToSave: any = {};

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

        // initialize object
        this.objectsToSave = {};

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
   * Back to company list page.
   */
  backPage() {
    return this.router.navigate(['/administrador/empresa']);
  }

  /**
   * On checkbox value change, save object.
   */
  onCheckboxValueChange(event: any, agencyId: string, serviceTypeId: string, companyId: string) {

    // log event
    console.log('is checked: ', event.target.checked);
    console.log('agency_id: ', agencyId);
    console.log('service_type_id: ', serviceTypeId);
    console.log('company_id: ', companyId);

    // save
    if (this.objectsToSave[serviceTypeId]) {

      // delete old object
      delete this.objectsToSave[serviceTypeId];

    } else {

      // append new object
      this.objectsToSave[serviceTypeId] = {
        agency_id: agencyId,
        service_type_id: serviceTypeId,
        company_id: companyId,
        checked: event.target.checked,
      };

    }

    // log object
    console.log(this.objectsToSave);

  }

  /**
   * Save service types.
   */
  async saveServiceType(objectsToSave: any) {

    // log
    console.log({ data: Object.values(objectsToSave) });
    console.log(JSON.stringify({ data: Object.values(objectsToSave) }));

    try {

      // update
      const response: any = await this.companyService.updateServiceTypes({ data: Object.values(objectsToSave) });

      // log response
      console.log(response);

      // define message
      this.swalOptions.title = 'Sucesso';
      this.swalOptions.content = 'Empresa atualizada com sucesso';
      this.swalOptions.button = 'Ok';

    } catch (e) {

      // log error
      console.error(e);

      // define message
      this.swalOptions.title = 'Erro';
      this.swalOptions.content = 'Erro ao atualizar empresa';
      this.swalOptions.button = 'Entendi';

    }

    // show message
    this.messageComponent.show();

  }

}
