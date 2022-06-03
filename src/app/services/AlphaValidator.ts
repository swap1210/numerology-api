import { FormControl, ValidationErrors } from '@angular/forms';

const ALPHA_REGEX = /^[a-zA-Z_]*$/;
const ALPHA_VALIDATION_ERROR = {
  alphaNumericError: 'only alpha numeric values are allowed',
};

function alphaValidator(control: FormControl): ValidationErrors | null {
  return ALPHA_REGEX.test(control.value) ? null : ALPHA_VALIDATION_ERROR;
}
