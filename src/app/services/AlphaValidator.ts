import { FormControl, ValidationErrors } from '@angular/forms';
export class CustomValidation {
  static ALPHA_REGEX = /^[a-zA-Z\d\s]*$/;
  static ALPHA_VALIDATION_ERROR = {
    alphaNumericError: 'only alpha numeric values are allowed',
  };

  static alphasOnly = (control: FormControl): ValidationErrors | null => {
    return this.ALPHA_REGEX.test(control.value)
      ? null
      : this.ALPHA_VALIDATION_ERROR;
  };
}
