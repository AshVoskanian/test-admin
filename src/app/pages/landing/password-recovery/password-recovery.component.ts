import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {RegisterFormComponent} from "../../../shared/components/register-form/register-form.component";
import {CheckboxComponent} from "../../../shared/components/checkbox/checkbox.component";
import {InputComponent} from "../../../shared/components/input/input.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ApiBase} from "../../../shared/bases/api-base";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {
  PasswordStrength,
  PasswordStrengthComponent
} from "../../../shared/components/password-strength/password-strength.component";
import {passwordValidator} from "../../../shared/validators/pass-validator";
import {confirmPasswordValidator} from "../../../shared/validators/password-match-validator";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {UtilsService} from "../../../shared/utils/utils.service";
import {ToastService} from "../../../shared/services/toast-helper-service.service";
import {ResetPassword, UrlData} from "./password-recovery";
import {TranslateModule} from "@ngx-translate/core";
import {ResultComponent, ResultModel} from "../../../shared/components/result/result.component";

@Component({
  selector: 'app-password-recovery',
  standalone: true,
  imports: [
    RegisterFormComponent,
    CheckboxComponent,
    InputComponent,
    ReactiveFormsModule,
    PasswordStrengthComponent,
    RouterLink,
    TranslateModule,
    ResultComponent
  ],
  templateUrl: './password-recovery.component.html',
  styleUrl: './password-recovery.component.scss'
})
export class PasswordRecoveryComponent extends ApiBase implements OnInit {
  success = signal<boolean>(false);
  urlData = signal<UrlData | null>(null);
  isPasswordResetLink = signal<boolean>(false);
  resultData = signal<ResultModel | null>({
    type: 'success',
    title: 'RESET_PASS.CHECK_EMAIL',
    text: 'RESET_PASS.SENT_LINK',
    btnText: 'RESET_PASS.BACK_TO_LOGIN'
  });

  form: FormGroup;

  private router = inject(Router);
  private dr = inject(DestroyRef);
  private fb: FormBuilder = inject(FormBuilder);
  private toast = inject(ToastService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.checkIfIsPasswordResetLink();
  }

  checkIfIsPasswordResetLink() {
    this.route.queryParams.subscribe(params => {
      this.urlData.set({token: params['token'], id: params['id']});

      if (params['token']) {
        this.isPasswordResetLink.set(true);
      } else {
        this.isPasswordResetLink.set(false);
      }
    });

    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      email: ['', [!this.isPasswordResetLink() ? Validators.required : Validators.nullValidator, Validators.email]],
      password: this.fb.control(''),
      confirmPassword: this.fb.control(''),
    })

    if (this.isPasswordResetLink()) {
      const passValidator = this.isPasswordResetLink() ? Validators.required : Validators.nullValidator;
      this.form.get('password')?.setValidators([passValidator, passwordValidator()]);

      this.form.get('confirmPassword')?.setValidators([passValidator, confirmPasswordValidator(this.form.get('password'))]);
    } else {
      this.form.get('password').reset();
      this.form.get('confirmPassword').reset();
    }
  }

  passwordStrengthData(): PasswordStrength {
    const password = this.form.get('password')?.value;

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

  submit() {
    UtilsService.markFormGroupTouched(this.form);

    if (this.form.valid) {
      if (this.isPasswordResetLink()) {
        this.resetPassword(this.form.get('password')?.value, this.urlData().id, this.urlData().token);
      } else {
        this.initPasswordChange(this.form.get('email').value);
      }
    }
  }

  initPasswordChange(email: string): void {
    this.post<ResetPassword>('Account/CreatePasswordChangeUrl', {email})
      .pipe(takeUntilDestroyed(this.dr))
      .subscribe({
        next: res => {
          if (!UtilsService.isEmptyObject(res.errors)) {
            this.toast.showError('ERRORS.' + res.errors.errorCode);
          } else {
            this.success.set(true);
          }
        }
      });
  }

  resetPassword(newPassword: string, id: string, token: string): void {
    this.post<any, ResetPassword>('Account/ResetPassword', {newPassword, id, token})
      .pipe(takeUntilDestroyed(this.dr))
      .subscribe({
        next: res => {
          if (!UtilsService.isEmptyObject(res.errors)) {
            this.toast.showError('ERRORS.' + res.errors.errorCode);
          } else {
            this.toast.showSuccess('MESSAGES.PASS_CHANGED_SUCCESSFULLY');
            this.router.navigate(['/landing/auth']).then();
          }
        }
      });
  }
}
