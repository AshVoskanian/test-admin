import { Component, inject, OnInit, signal } from '@angular/core';
import { ToggleMenuDirective } from "../../../shared/directives/toggle.directive";
import { ListComponent } from "../../../shared/components/list/list.component";
import { List } from "../../../shared/components/list/list.interface";
import { AuthService } from "../../../shared/services/auth.service";
import { ModalComponent } from "../../../shared/components/modal/modal.component";
import { RegisterFormComponent } from "../../../shared/components/register-form/register-form.component";
import { InputComponent } from "../../../shared/components/input/input.component";
import { NavigationService } from "../../../shared/services/navigation.service";
import { AsyncPipe } from "@angular/common";
import {ChangePasswordComponent} from "../../../shared/components/change-password/change-password.component";
import {ApiBase} from "../../../shared/bases/api-base";
import {UtilsService} from "../../../shared/utils/utils.service";
import {ToastService} from "../../../shared/services/toast-helper-service.service";
import {Customer} from "../../../shared/interfaces/main-interface";
import {AnimationDirective} from "../../../shared/directives/animation.directive";
import {AnimationTypes} from "../../../shared/enums/animations.enum";

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [
    ToggleMenuDirective,
    ListComponent,
    ModalComponent,
    RegisterFormComponent,
    InputComponent,
    AsyncPipe,
    RegisterFormComponent,
    ChangePasswordComponent,
    AnimationDirective
  ],
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.scss'
})
export class DashboardHeaderComponent extends ApiBase implements OnInit {
  showRegModal = signal<boolean>(false);
  showPassChangeModal = signal<boolean>(false);
  optionsList = signal<Array<List>>([]);
  customer = signal<Customer | null>(null);

  private readonly toast = inject(ToastService);
  private readonly authService = inject(AuthService);
  public readonly navService = inject(NavigationService);

  readonly animationTypes = AnimationTypes;

  ngOnInit() {
    this.getUserInfo();
  }

  fillOptions() {
    this.optionsList.set([
      {
        text: 'GENERAL.CHANGE_PASS',
        value: 'changePassword',
        class: 'bg-profile'
      },
      {
        text: 'GENERAL.ADD_USER',
        value: 'addUser',
        class: 'bg-add-user',
        hide: this.customer().roleNormalized !== 'ADMINISTRATOR'
      },
      {
        text: 'GENERAL.LOGOUT',
        value: 'logout',
        class: 'bg-logout'
      }
    ]);
  }

  getUserInfo() {
    this.get<Customer>('account/getUserInfo')
      .subscribe({
        next: res => {
          if (!UtilsService.isEmptyObject(res.errors)) {
            this.toast.showError('ERRORS.' + res.errors.errorCode);
          } else {
            this.customer.set(res.data);
            this.fillOptions();
          }
        },
        error: () => {
          this.fillOptions();
        }
      })
  }

  select(option: List) {
    if (option.value === 'addUser') {
      this.showRegModal.set(true);
    }

    if (option.value === 'changePassword') {
      this.showPassChangeModal.set(true);
    }

    if (option.value === 'logout') {
      this.authService.logout();
    }
  }
}
