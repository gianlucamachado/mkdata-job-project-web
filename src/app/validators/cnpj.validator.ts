import { FormControl } from '@angular/forms';
import isValidCnpj from '@brazilian-utils/is-valid-cnpj';

/**
 * ### CNPJ Validator
 *
 * Realizes the cnpj validation.
 */
export class CnpjValidator {

  /**
   * Verify if cnpj number is valid
   * @param control Form control object.
   * @returns Any return.
   */
  static isValid(control: FormControl) {

    // return if is valid
    if (isValidCnpj(control.value)) {
      return null;
    }

    // return if is invalid
    return { invalidCnpj: true };
  }

}
