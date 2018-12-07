import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { Login } from '../../classes/login.class';
import { MaterializeAction } from 'angular2-materialize';
import { UtilsService } from '../../providers/utils/utils.service';
import { Router } from '@angular/router';

/**
 * Login page component
 *
 * Requires user information to auth.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  /**
   * Loading present variable.
   */
  public loading: boolean = false;

  /**
   * Recovery form.
   */
  public recoveryForm: FormGroup;

  /**
   * Background picture url.
   */
  public backgroundPicture: string = 'assets/bk-login.jpg';

  /**
   * Modal actions.
   */
  public modalActions = new EventEmitter<any | MaterializeAction>();

  /**
   * Modal params.
   */
  public modalParams = [{ dismissible: false, complete: () => { } }];

  /**
   * Submitt attempt
   */
  public submitAttempt: boolean = false;

  /**
   * @ignore
   */
  constructor(
    private formBuilder: FormBuilder,
    public utils: UtilsService,
    private router: Router,
  ) { }

  /**
   * @ignore
   */
  ngOnInit(): void {

    // tslint:disable-next-line:no-this-assignment
    const self = this;

    // initialize form
    self.recoveryForm = self.initializeForm();
  }

  /**
   * Initialize form.
   */
  initializeForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });
  }

  /**
   * Verify if user exists and redirect to main dashboard.
   * @param form Object of FormGroup that contains email and password.
   */
  signInUser(form: FormGroup): void {

    // get user value information
    const user: Login = form.getRawValue();

    // log user
    console.table(user);

    // navigate
    this.router.navigate(['administrador']);
  }

  /**
   * Open modal to recovery user password.
   */
  recoveryUserPassword(form: FormGroup): void {

    // log value
    console.log('recovery user password', form.getRawValue());

  }

  /**
   * Open modal.
   */
  openModal(): void {

    // tslint:disable-next-line:no-this-assignment
    const self = this;

    // emit event to open modal
    self.modalActions.emit({ action: 'modal', params: ['open'] });

  }

  /**
   * Close modal page.
   */
  closeModal(close: boolean, form: FormGroup): void {

    // tslint:disable-next-line:no-this-assignment
    const self = this;

    // verify
    if (close) {
      self.recoveryUserPassword(form);
    } else {
      // emit event to close modal
      self.modalActions.emit({ action: 'modal', params: ['close'] });
    }

  }
}
