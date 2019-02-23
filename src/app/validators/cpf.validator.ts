import { FormControl } from '@angular/forms';
import isValidCpf from '@brazilian-utils/is-valid-cpf';

/**
 * ### CPF Validator
 *
 * Realizes the cpf validation.
 */

export class CPFValidator {

  /**
   * Verify if cpf number is valid
   * @param control Form control object.
   * @returns Any return.
   */
  static isValid(control: FormControl) {

    if (isValidCpf(control.value)) {
      return null;
    }

    return { invalidCPF: true };
  }
}
