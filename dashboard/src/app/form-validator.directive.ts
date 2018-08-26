import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

/** Date must match YYYY-MM-DD format */
export const dateValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null =>  {
  const format: RegExp = /^[1-2][0-9]{3}-[0-2][0-9]-[0-3][0-9]$/;
  return format.test(control.value) ? null : { 'dateFormatInvalid': true };
}

@Directive({
  selector: '[appFormValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: FormValidatorDirective, multi: true }]
})
export class FormValidatorDirective implements Validator {
  @Input('appFormValidator') date: string;

  validate(control: AbstractControl): ValidationErrors{
    return dateValidator(control);
  }
}
