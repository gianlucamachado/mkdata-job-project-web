import { TokenService } from './../../providers/token/token.service';
import { LoginService } from './login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { UtilsService } from '../../providers/utils/utils.service';
import { Router } from '@angular/router';
import { SweetMessageComponent } from '../../components/others/sweet-message/sweet-message.component';
import * as jwtDecode from 'jwt-decode';
import * as md5 from 'md5';
import { StorageService } from '../../providers/storage/storage.service';

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
   * Loading spinner present variable.
   */
  public loadingSpinner: boolean = false;

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
   * Temporary e-mail.
   */
  public recoveryEmail: string;

  /**
   * @ignore
   */
  constructor(
    private formBuilder: FormBuilder,
    public utils: UtilsService,
    private router: Router,
    private loginService: LoginService,
    private tokenService: TokenService,
    private storageService: StorageService,
  ) { }

  /**
   * @ignore
   */
  ngOnInit(): void {

    // initialize form
    this.recoveryForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });

  }

  /**
   * Verify if user exists and redirect to main dashboard.
   * @param form Object of FormGroup that contains email and password.
   */
  async signInUser(form: FormGroup) {

    // get form value
    const value: any = form.getRawValue();

    // log values
    console.log(value);

    // try/catch
    try {

      // set loading
      this.loading = true;

      // do login
      const token: string = await this.loginService.login(value);

      // log response
      console.log(token);

      // decode token
      const decodedToken: any = jwtDecode(token);

      // print decoded token
      console.log(decodedToken);

      // declare path
      const path: string = '/administrador';

      // log path
      console.log(path);

      // set new token
      this.tokenService.setToken(token);

      // save on storage
      await this.storageService.store('token', this.tokenService.getToken());

      // navigate to admin route
      await this.router.navigate([path]);

    } catch (e) {

      // log error
      console.error(e);

      // set message
      this.swalOptions.title = 'Usuário e/ou senha inválidos';
      this.swalOptions.content = 'Verifique as informações inseridas e tente novamente.';
      this.swalOptions.button = 'Entendi';

      // present swal
      this.messageComponent.show();

    }

    // dismiss loading
    this.loading = false;
  }

  /**
   * Open modal to recovery user password.
   */
  async recoveryUserPassword(form: FormGroup): Promise<void> {

    // get form value
    const value: any = form.getRawValue();

    // log values
    console.log(value);

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
      // emit event to close modals
      self.modalActions.emit({ action: 'modal', params: ['close'] });
      // reset form
      this.recoveryForm.reset();
    }
  }
}
