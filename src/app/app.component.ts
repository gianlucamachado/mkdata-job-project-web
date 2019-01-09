import { Component, OnInit } from '@angular/core';
import * as jwtDecode from 'jwt-decode';
import * as faker from 'faker';
import { StorageService } from './providers/storage/storage.service';
import { TokenService } from './providers/token/token.service';
import { HttpRequestService } from './providers/http-request/http-request.service';
import { Router, RoutesRecognized } from '@angular/router';

/**
 * App component.
 * @ignore
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  /**
   * Title of app.
   */
  public title = 'Report Corporate Web';

  /**
   * Routes that will be not verify token.
   */
  public routes: string[] = [
    '/recuperar-acesso',
  ];

  /**
   * @ignore
   */
  constructor(
    private storageService: StorageService,
    private tokenService: TokenService,
    private httpRequestService: HttpRequestService,
    private router: Router,
  ) { }

  /**
   * On init.
   */
  ngOnInit() {

    // set faker locale
    faker.locale = 'pt_BR';

    // reconize routes
    const sub = this.router.events.subscribe(async (event) => {
      if (event instanceof RoutesRecognized) {

        // log
        console.log(event);

        // verify route
        if (!this.arrayContains(event.url, this.routes)) {

          // validate
          this.validateSavedToken();

        }

        // unsubscribe
        sub.unsubscribe();

      }
    });
  }

  /**
   * Verify contain string into array.
   */
  arrayContains(needle: string, arrhaystack: string[]) {
    return (arrhaystack.indexOf(needle.split('?')[0]) > -1);
  }

  /**
   * Validate saved token
   */
  async validateSavedToken() {
    try {

      // get token
      const token = await this.storageService.retrieve('token');

      // log token
      console.log('token', token);

      // set token on provider
      this.tokenService.setToken(token);

      // if dont have token
      if (!token) {
        throw Error('Token not storage');
      }

      // validate token
      await new Promise<any>((resolve, reject) => {
        this.httpRequestService.getRequestWithAuthorization('/api/user/validate')
          .subscribe(_ => resolve(), _ => reject());
      });

      // log response
      console.log('token validado com sucesso');

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
        // go to admin painel
        path = (this.router.url === '/') ? '/administrador' : this.router.url;
      } else {
        // got to home
        path = '';
        // remove token case user is customer
        // customer can not enter in web
        this.tokenService.setToken(null);
        // remove token case user is customer
        this.storageService.removeItem('token');
      }

      // log path
      console.log(path);

      // navigate to admin route
      await this.router.navigate([path]);

    } catch (e) {

      // log error
      console.error('Token inválido!', e);

      // get token
      this.storageService.removeItem('token');

      // set token on provider
      this.tokenService.setToken(null);

      // navigate
      this.router.navigate(['/']);

    }
  }

}
