import { FormControl } from '@angular/forms';
import isValidCep from '@brazilian-utils/is-valid-cep';

/**
 * ### Cep Validator
 *
 * Realizes the Cep validation.
 */
export class CepValidator {

  /**
   * Verify if Cep number is valid
   * @param control Form control object.
   * @returns Any return.
   */
  static isValid(control: FormControl) {

    // return if is valid
    if (isValidCep(control.value)) {
      return null;
    }

    // return if is invalid
    return { invalidCep: true };
  }

}
