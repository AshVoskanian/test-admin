import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function confirmPasswordValidator(passwordControl: AbstractControl): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = passwordControl?.value;
    const confirmPassword = control?.value;

    return password && confirmPassword && password === confirmPassword
      ? null
      : { mismatch: true };
  };
}
