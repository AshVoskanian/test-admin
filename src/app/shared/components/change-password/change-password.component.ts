import {Component, DestroyRef, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {RouterLink} from "@angular/router";
import {InputComponent} from "../input/input.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UtilsService} from "../../utils/utils.service";
import {ApiBase} from "../../bases/api-base";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {passwordValidator} from "../../validators/pass-validator";
import {PasswordStrength, PasswordStrengthComponent} from "../password-strength/password-strength.component";
import {ToastService} from "../../services/toast-helper-service.service";
import {confirmPasswordValidator} from "../../validators/password-match-validator";

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    RouterLink,
    InputComponent,
    ReactiveFormsModule,
    PasswordStrengthComponent
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent extends ApiBase implements OnInit {
  @Output() finish: EventEmitter<boolean> = new EventEmitter();

  form!: FormGroup;

  private readonly dr = inject(DestroyRef);
  private readonly fb = inject(FormBuilder);
  private readonly toast = inject(ToastService);

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      currentPassword: this.fb.control('', [Validators.required]),
      newPassword: this.fb.control('', [Validators.required, passwordValidator()]),
      confirmPassword: this.fb.control(''),
    });

    this.form.get('confirmPassword')?.setValidators([passwordValidator(), confirmPasswordValidator(this.form.get('newPassword'))]);
  }

  submit() {
    UtilsService.markFormGroupTouched(this.form);

    if (this.form.valid) {
      this.post('account/changePassword', {...this.form.getRawValue()})
        .pipe(takeUntilDestroyed(this.dr))
        .subscribe({
          next: (res) => {
            if (!UtilsService.isEmptyObject(res.errors)) {
              this.toast.showError('ERRORS.' + res.errors.errorCode);
            } else {
              this.toast.showSuccess('MESSAGES.PASS_CHANGED_SUCCESSFULLY');
              this.finish.emit(true);
            }
          }
        })
    }
  }

  passwordStrengthData(): PasswordStrength {
    const password = this.form.get('newPassword')?.value;

    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const number = /[0-9]/.test(password);
    const length = password.length >= 8;

    return {
      lowercase,
      uppercase,
      number,
      length
    }
  }
}
