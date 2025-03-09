import {Component, DestroyRef, EventEmitter, inject, Input, OnInit, Output, signal} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {InputComponent} from "../input/input.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UtilsService} from "../../utils/utils.service";
import {ApiBase} from "../../bases/api-base";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {AuthService} from "../../services/auth.service";
import {ToastService} from "../../services/toast-helper-service.service";
import {ResultComponent, ResultModel} from "../result/result.component";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    RouterLink,
    InputComponent,
    ReactiveFormsModule,
    ResultComponent,
    TranslateModule
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent extends ApiBase implements OnInit {
  @Input() regType: 'landing' | 'dashboard' = 'landing';
  @Output() finish: EventEmitter<boolean> = new EventEmitter();

  success = signal<boolean>(false);
  resultData = signal<ResultModel | null>(null);

  form!: FormGroup;

  private readonly router = inject(Router);
  private readonly dr = inject(DestroyRef);
  private readonly fb = inject(FormBuilder);
  private readonly toast = inject(ToastService);
  private readonly authService = inject(AuthService);

  ngOnInit() {
    this.initForm();
    this.setResultData();
  }

  setResultData() {
    this.resultData.set({
      type: 'success',
      title: 'MESSAGES.SUCCESS',
      text: 'MESSAGES.REG_SUCCESSFULLY',
      btnText: this.regType === 'landing' ? 'RESET_PASS.BACK_TO_LOGIN' : 'GENERAL.CLOSE'
    });
  }

  initForm() {
    this.form = this.fb.group({
      firstName: this.fb.control('', [Validators.required]),
      lastName: this.fb.control('', [Validators.required]),
      phoneNumber: this.fb.control('', [Validators.required]),
      companyName: this.fb.control('', this.regType === 'landing' ? [Validators.required] : []),
      email: this.fb.control('', [Validators.required, Validators.email]),
    });
  }

  submit() {
    UtilsService.markFormGroupTouched(this.form);

    const endPoint: string = this.regType === 'landing' ? 'account/register' : 'account/registerUser';

    if (this.form.valid) {
      this.post(endPoint, {...this.form.getRawValue()})
        .pipe(takeUntilDestroyed(this.dr))
        .subscribe({
          next: (res) => {
            if (!UtilsService.isEmptyObject(res.errors)) {
              this.toast.showError('ERRORS.' + res.errors.errorCode);
            } else {
              this.success.set(true);
            }
          },
          error: _ => {

          }
        })
    }
  }

  navigate() {
    if (this.regType === 'landing') {
      this.router.navigateByUrl('/landing/auth').then();
      this.authService.newlyCreatedUser = this.form.get('email')?.value;
    } else {
      this.finish.emit(true);
    }
  }
}
