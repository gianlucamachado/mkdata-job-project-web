import { LoginInterface } from '../interfaces/login.interface';

/**
 * Class used to sign user in the app.
 */
export class Login implements LoginInterface {

  /**
   * Constructor method of login.
   * @param email User email
   * @param password User password
   */
  constructor(
    public email: string,
    public password: string,
  ) {}

}
