import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {InputComponent} from "../../../shared/components/input/input.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UtilsService} from "../../../shared/utils/utils.service";
import {EMAIL} from "../../../shared/utils/regex";
import {ApiBase} from "../../../shared/bases/api-base";
import {CheckboxComponent} from "../../../shared/components/checkbox/checkbox.component";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {AuthService} from "../../../shared/services/auth.service";
import {LocalStorageService} from "../../../shared/services/local-storage.service";
import {ToastService} from "../../../shared/services/toast-helper-service.service";
import {TranslateModule} from "@ngx-translate/core";
import {MatFormField} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    RouterLink,
    InputComponent,
    ReactiveFormsModule,
    CheckboxComponent,
    TranslateModule,
    MatFormField,
    MatIcon,
    MatInput,
    MatButton
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent extends ApiBase implements OnInit {
  form!: FormGroup;

  private readonly fb = inject(FormBuilder);
  private readonly dr = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  private readonly authService = inject(AuthService);
  private readonly localStorage = inject(LocalStorageService);

  ngOnInit() {
    this.initForm();
    this.checkIfRedirectFromReg();
  }

  initForm() {
    this.form = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.pattern(EMAIL)]),
      password: this.fb.control('', [Validators.required]),
      saveEmail: this.fb.control(false)
    });
  }

  checkIfRedirectFromReg() {
    this.authService.newlyCreatedUser
      .pipe(takeUntilDestroyed(this.dr))
      .subscribe(email => {
        if (email) {
          this.setUserNameFromReg(email);
        } else {
          this.checkIfUsernameIsRemembered();
        }
      })
  }

  setUserNameFromReg(username: string) {
    this.form.get('email')?.setValue(username);
  }

  checkIfUsernameIsRemembered() {
    const username = this.localStorage.getItem<string>("email");

    if (username) {
      this.form.get('email')?.setValue(username);
      this.form.get('saveEmail')?.setValue(true);
    }
  }

  submit() {
    UtilsService.markFormGroupTouched(this.form);

    if (this.form.valid) {
      this.post<{ token: string }>('account/login', {
        email: this.form.get('email')?.value,
        password: this.form.get('password')?.value
      })
        .pipe(takeUntilDestroyed(this.dr))
        .subscribe({
          next: res => {
            if (!UtilsService.isEmptyObject(res.errors)) {
              this.toast.showError('ERRORS.' + res.errors.errorCode);
            } else {
              if (this.form.get('saveEmail')?.value) {
                this.localStorage.setItem<string>('email', this.form.get('email')?.value)
              } else {
                this.localStorage.removeItem('email');
              }

              this.authService.setToken(res.data.token);
              this.router.navigateByUrl('dashboard/jobs').then();
            }
          }
        });
    }
  }
}
