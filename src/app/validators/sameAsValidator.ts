import {AbstractControl, ValidatorFn} from '@angular/forms';

export function sameAsValidator(val: string): ValidatorFn {

  return (control: AbstractControl): {[key: string]: any} | null => {
    if (control.value !== undefined && control.value === val) {
      return { 'sameAs': true};
    }
    return null;
  };
}
