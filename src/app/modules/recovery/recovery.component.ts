import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RecoveryService } from './recovery.service';
import { SwalPartialTargets } from '@toverux/ngx-sweetalert2';
import { HttpRequestService } from '../../providers/http-request/http-request.service';
import { UtilsService } from '../../providers/utils/utils.service';
import { ConfirmPasswordValidator } from '../../validators/confirm-password.validator';
import * as jwtDecode from 'jwt-decode';
import * as md5 from 'md5';
import { SweetMessageComponent } from '../../components/others/sweet-message/sweet-message.component';
declare var Materialize: any;

/**
 * Recovery password page.
 */
@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss'],
})
export class RecoveryComponent implements OnInit, AfterViewInit {

  /**
   * Background picture url.
   */
  public backgroundPicture: string = 'assets/bk-login.jpg';

  /**
   * Recovery form group.
   */
  public recoveryForm: FormGroup;

  /**
   * Loading variable
   */
  public loading: boolean = true;

  /**
   * redierect
   */
  public error: boolean = false;

  /**
   * Submitt attempt
   */
  public submitAttempt: boolean = false;

  /**
   * Token param
   */
  public token: string;

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
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private httpRequestService: HttpRequestService,
    private router: Router,
    private recoveryService: RecoveryService,
    public utilsService: UtilsService,
    public readonly swalTargets: SwalPartialTargets,
  ) { }

  /**
   * @ignore
   */
  async ngOnInit() {

    // initialize form
    this.recoveryForm = this.formBuilder.group({
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirm_password: ['', Validators.compose([Validators.required, Validators.minLength(6), ConfirmPasswordValidator.isValid])],
    });

  }

  /**
   * Ng after view init.
   */
  async ngAfterViewInit() {

    // try/catch
    try {

      // get param
      this.token = await new Promise<any>((resolve) => {
        this.activatedRoute
          .queryParams
          .subscribe(async (params) => {

            // Defaults to 0 if no query param provided.
            const token: string = params['token'] || '';

            // resolve
            resolve(token);

          });
      });

      // get token
      this.token = `Bearer ${this.token}`;

      // log token
      console.log('token recovery password', this.token);

      // validate token
      await new Promise<any>((resolve, reject) => {
        this.httpRequestService.
          postRequestWithAuthorization('/api/recovery-password', {}, 'application/json', this.token)
          .subscribe(_ => resolve(), _ => reject());
      });

      // log response
      console.log('token validado com sucesso');

      // update fields
      Materialize.updateTextFields();

      // decode token
      const decodedToken: any = jwtDecode(this.token);

      // print decoded token
      console.log('decoded token', decodedToken);

    } catch (e) {

      // print error
      console.error(e);

      // Error message
      this.swalOptions.title = 'Token inválido';
      this.swalOptions.content = 'Este token está inválido.';
      this.swalOptions.button = 'Ir para a página principal';

      // show
      this.messageComponent.show();

    }

    // dismiss loading
    setTimeout(() => this.loading = false, 1000);

    // update text fields
    setTimeout(() => Materialize.updateTextFields(), 1100);

  }

  /**
   * Recovery password.
   */
  async changePassword(form: FormGroup) {

    // get value
    const value: any = form.getRawValue();

    // convert password and confirm password to md5
    value.password = md5(value.password);
    value.confirm_password = md5(value.confirm_password);

    // log value
    console.log(value);

    // if valid
    if (form.valid) {

      // set false on submit attempt
      this.submitAttempt = false;

      // show loading
      this.loading = true;

      // try/catch
      try {

        // change password
        await this.recoveryService.changePassword(value, this.token);

        // messsage
        this.swalOptions.title = 'Senha alterada com sucesso!';
        this.swalOptions.content = 'Sua senha foi alterada com sucesso.';
        this.swalOptions.button = 'Ir para a página principal';

        // set true
        this.error = false;

      } catch (e) {

        // log error
        console.error(e);

        // messsage
        this.swalOptions.title = 'Erro ao alterar senha';
        this.swalOptions.content = 'Um erro ocorreu ao alterar a senha. Verifique as informações e tente novamente.';
        this.swalOptions.button = 'Entendi';

        // set true
        this.error = true;

      }

      // dismiss loading
      setTimeout(() => this.loading = false, 500);

      // show
      this.messageComponent.show();

    } else {

      // set true on submit attempt
      this.submitAttempt = true;

    }

  }

  /**
   * Redirect from page.
   */
  redirect() {

    // token invalido
    if (!this.error) {
      this.router.navigate(['']);
    }

  }

}
