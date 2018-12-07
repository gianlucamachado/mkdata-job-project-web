import { FormControl } from '@angular/forms';
import isValidPhone from '@brazilian-utils/is-valid-phone';

/**
 * ### Phone number Validator
 *
 * Realizes the Phone number validation.
 */
export class PhoneValidator {

  /**
   * Verify if phone number is valid
   * @param control Form control object.
   * @returns Any return.
   */
  static isValid(control: FormControl) {

    // return if is valid
    if (isValidPhone(control.value)) {
      return null;
    }

    // return if is invalid
    return { invalidPhone: true };
  }

}
