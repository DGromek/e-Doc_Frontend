import {AbstractControl, ValidatorFn} from '@angular/forms';

export function sameAsValidator(val: string): ValidatorFn {

  return (control: AbstractControl): {[key: string]: any} | null => {
    if (control.value !== undefined && control.value === val) {
      console.log('TAK');
      return { 'sameAs': true};
    }
    console.log('NIE');
    console.log(val);
    return null;
  };
}
