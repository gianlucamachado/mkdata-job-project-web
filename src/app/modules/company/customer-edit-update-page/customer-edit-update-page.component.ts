import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { SweetMessageComponent } from '../../../components/others/sweet-message/sweet-message.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from '../../../providers/utils/utils.service';
import { CnpjValidator } from '../../../validators/cnpj.validator';
import { CPFValidator } from '../../../validators/cpf.validator';
import { PhoneValidator } from '../../../validators/phone.validator';
import { LengthValidator } from '../../../validators/length.validator';
declare var Materialize: any;

/**
 * Customer edit page.
 */
@Component({
  selector: 'app-customer-edit-update-page',
  templateUrl: './customer-edit-update-page.component.html',
  styleUrls: ['./customer-edit-update-page.component.scss'],
})
export class CustomerEditUpdatePageComponent implements OnInit {

  /**
   * Customer form.
   */
  public customerForm: FormGroup;

  /**
   * phone form.
   */
  public phoneForm: FormGroup;

  /**
   * Submit attempt variable.
   */
  public submitAttempt: boolean = false;

  /**
   * Define form is edit mode.
   */
  public editMode: boolean = false;

  /**
   * Loading page transparent component.
   */
  public showLoadingPageTransparent: boolean = false;

  /**
   * All groups to select.
   */
  public groups: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'U', 'V', 'W', 'X', 'Y', 'Z'];

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
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public utilsService: UtilsService,
  ) { }

  /**
   * @ignore
   */
  ngOnInit() {

    // initiliaze form
    this.customerForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      document_one: ['', Validators.compose([Validators.required])],
      document_two: [''],
      group: ['', Validators.compose([Validators.required])],
      type: ['', Validators.compose([Validators.required])],
      is_active: [true, Validators.compose([Validators.required])],
      phones: this.formBuilder.array([], LengthValidator.isValid),
    });

    this.phoneForm = this.formBuilder.group({
      phone: ['', Validators.compose([Validators.required, PhoneValidator.isValid])],
    });

    // get customer id
    const customer_id: string = this.activatedRoute.snapshot.paramMap.get('customer_id');

    // create subscribe and define validators
    this.customerForm.controls.type.valueChanges.subscribe((value: string) => {

      if (value) {
        if (value === 'PF') {
          this.customerForm.controls.document_one.setValidators([Validators.required, CPFValidator.isValid]);
        } else if (value === 'PJ') {
          this.customerForm.controls.document_one.setValidators([Validators.required, CnpjValidator.isValid]);
        }
      }

      // update fields
      setTimeout(() => Materialize.updateTextFields(), 500);

    });

    // define edit mode value
    this.editMode = (customer_id) ? true : false;

  }

  /**
   * Back to company list page.
   */
  backPage() {
    return this.router.navigate(['/administrador/empresa']);
  }

  /**
   * Add new number value.
   */
  addNewPhone(form: FormGroup) {

    // get form value
    const value: any = form.getRawValue();

    // log form value
    console.log(value);

    if (form.valid) {
      // set new phone value
      (this.customerForm.get('phones') as FormArray).push(
        this.formBuilder.group({
          number: value.phone,
        }),
      );
    }

  }

  /**
   * Validate form values.
   * @param form Form group.
   */
  validate(form: FormGroup) {

    // get form value
    const value: any = form.getRawValue();

    // log form value
    console.log(value);

    if (form.valid) {

      // set submit attempt as false
      this.submitAttempt = false;

    } else {

      // set submit attempt as true
      this.submitAttempt = true;

    }

  }

}
