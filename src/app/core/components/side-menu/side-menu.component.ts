import {Component, inject, OnInit, signal} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {RippleDirective} from "../../../shared/directives/ripple.directive";
import {NavigationService} from "../../../shared/services/navigation.service";
import {map, Observable, take} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {TooltipDirective} from "../../../shared/directives/tooltip.directive";
import {ModalComponent} from "../../../shared/components/modal/modal.component";
import {ApiBase} from "../../../shared/bases/api-base";
import {ToastService} from "../../../shared/services/toast-helper-service.service";
import {TranslateModule} from "@ngx-translate/core";

export interface MenuItems {
  title: string;
  icon: string;
  route: string;
  hide: boolean;
}

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink,
    RippleDirective,
    AsyncPipe,
    TooltipDirective,
    ModalComponent,
    TranslateModule
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent extends ApiBase implements OnInit {
  private readonly toast = inject(ToastService);
  public readonly navService = inject(NavigationService);
  public readonly breakpointObserver = inject(BreakpointObserver);

  menuItems: Observable<MenuItems[]>;

  showFeedback = signal<boolean>(false);

  ngOnInit() {
    this.checkBreakPoints();
    this.getMenuItems();
  }

  getMenuItems() {
    this.menuItems = this.http.get<{ MENU_ITEMS: MenuItems[] }>('./assets/configs/menu.json').pipe(
      map(it => {
        return it.MENU_ITEMS
      })
    )
  }

  checkBreakPoints() {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium
    ]).pipe(take(1))
      .subscribe(breakPoint => {
        if (breakPoint.matches) {
          this.navService.close();
        }
      });
  }

  toggle() {
    this.navService.sideBarState
      .pipe(take(1))
      .subscribe(state => {
        if (state === 'opened') {
          this.navService.close();
        } else if (state === 'closed') {
          this.navService.open();
        }
      });
  }
}
