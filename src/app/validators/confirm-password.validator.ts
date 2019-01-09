/**
 * ### Confirm password validator
 *
 * Realizes the password validation.
 */
export class ConfirmPasswordValidator {

  /**
   * Verify if two passwords are equal
   * @param control Form control object.
   * @returns Any return.
   */
  static isValid(control: any) {

    // on init form try/catch
    if (!control.parent) {
      return null;
    }

    // get value
    const password = control.parent.controls.password.value;
    const confirmPassword = control.value;

    // return null
    // dont has error
    if (password === confirmPassword || !password) {
      return null;
    }

    // return error
    return { invalidConfirmPassword: true };
  }

}
