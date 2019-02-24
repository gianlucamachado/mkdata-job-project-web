import { FormControl } from '@angular/forms';

/**
 * ### Length Validator
 *
 * Realizes the length validation.
 */
export class LengthValidator {

  /**
   * Verify lenght of array.
   * @param control Form control object.
   * @returns Any return.
   */
  static isValid(control: FormControl) {

    const value: number = Object.values(control.value).length;

    if (value > 0) {
      return null;
    }

    return { invalidLength: true };
  }

}
