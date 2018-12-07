import { environment } from './../../../../environments/environment';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Form login component
 *
 * Component that responsible to get information to auth user.
 */
@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss'],
})
export class FormLoginComponent implements OnInit {

  /**
   * Login formgroup variable.
   */
  public loginForm: FormGroup;

  /**
   * Submit attempt variable.
   */
  public submitAttempt: boolean = false;

  /**
   * Output event variable when form is valid.
   */
  @Output() onValidate: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  /**
   * Output event variable when user request recovery password.
   */
  @Output() onRecoveryPassword: EventEmitter<void> = new EventEmitter<void>();

  /**
   * @ignore
   */
  constructor(
    private formBuilder: FormBuilder,
  ) { }

  /**
   * @ignore
   */
  ngOnInit(): void {
    // tslint:disable-next-line:no-this-assignment
    const self = this;

    // initialize form
    self.loginForm = self.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.maxLength(50)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(50)])],
    });

    // bind values from dev env
    if (!environment.production) {
      self.loginForm.patchValue(environment.login);
    }
  }

  /**
   * Validate form values and dispare output event.
   * @param loginForm Form login.
   * @param onValidate Output event emitter when form is valid.
   * @returns void or boolean values.
   */
  validate(loginForm: FormGroup, onValidate: EventEmitter<FormGroup>): void | boolean {
    return (loginForm.valid) ? onValidate.emit(loginForm) : this.submitAttempt = true;
  }

  /**
   * Recovery password event.
   * @returns void value.
   */
  recoveryPassword(): void {
    return this.onRecoveryPassword.emit();
  }

}
