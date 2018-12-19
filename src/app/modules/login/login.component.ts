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
  async signInUser(form: FormGroup) {
    // get form value
    const value: any = form.getRawValue();

    // log values
    console.log(value);

    // try/catch
    try {

      // set loading
      this.loading = true;

      // set md5 password
      value.user_password = md5(value.user_password);

      // do login
      const response: any = await this.loginService.login(value);

      // log response
      console.log(response);

      // verify login
      if (!response.token) {
        throw Error('erro ao realizar login');
      }

      // get token
      const token: string = response.token;

      // decode token
      const decodedToken: any = jwtDecode(token);

      // print decoded token
      console.log(decodedToken);

      // get profile id
      const profileId: number = Number(decodedToken.prof_id);

      // log profile id
      console.log('profile_id: ', profileId);

      // declare path
      let path: string = '';

      // verify path
      if (profileId === 1) {

        // admin url
        path = '/administrador';

      } else {

        // is not employee
        // permission denied
        this.swalOptions.title = 'Acesso não permitido';
        this.swalOptions.content = 'Usuário não tem premissão para acessar o painel.';
        this.swalOptions.button = 'Entendi';
        this.loading = false;
        return this.messageComponent.show();
      }

      // log path
      console.log(path);

      // set new token
      this.tokenService.setToken(`Bearer ${token}`);

      // save on storage
      await this.storageService.store('token', this.tokenService.getToken());

      // navigate to admin route
      await this.router.navigate([path]);

    } catch (e) {

      // log error
      console.error(e);

      // handle errors
      if (e && e.error && e.error.message === 'status/invalid-password') {

        this.swalOptions.title = 'E-mail/Senha inválidos';
        this.swalOptions.content = 'Verifique as informações inseridas e tente novamente.';
        this.swalOptions.button = 'Entendi';

      } else if (e && e.error && e.error.message === 'status/user-not-found') {

        this.swalOptions.title = 'Usuário não encontrado';
        this.swalOptions.content = 'Este e-mail não possui nenhum usuário. Verifique as informações inseridas e tente novamente.';
        this.swalOptions.button = 'Entendi';

      } else if (e && e.error && e.error.message === 'status/email-not-verified') {

        this.swalOptions.title = 'E-mail não confirmado';
        this.swalOptions.content = 'Acesse seu endereço de e-mail para confirmar sua conta.';
        this.swalOptions.button = 'Entendi';

      } else if (e && e.error && e.error.message === 'status/invalid-email') {

        this.swalOptions.title = 'E-mail inválido';
        this.swalOptions.content = 'Este e-mail é inválido. Verifique as informações inseridas e tente novamente.';
        this.swalOptions.button = 'Entendi';

      } else {

        this.swalOptions.title = 'Erro ao realizar login';
        this.swalOptions.content = 'O login falhou. Verifique as informações inseridas e tente novamente.';
        this.swalOptions.button = 'Entendi';

      }

      // present swal
      this.messageComponent.show();

    }

    // dismiss loading
    this.loading = false;
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
