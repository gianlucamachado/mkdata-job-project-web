import { FormControl } from '@angular/forms';

/**
 * ### URL number Validator
 *
 * Realizes the URL number validation.
 */
export class URLValidator {

  /**
   * Verify if URL number is valid
   * @param control Form control object.
   * @returns Any return.
   */
  static isValid(control: FormControl) {

    const v: string = control.value;
    const regex = new RegExp(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm);

    // return if is valid
    if (regex.exec(v)) {
      return null;
    }

    // return if is invalid
    return { invalidURL: true };
  }

}
