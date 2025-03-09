import { Component, inject } from '@angular/core';
import { SideMenuComponent } from "../../core/components/side-menu/side-menu.component";
import { DashboardHeaderComponent } from "../../core/components/dashboard-header/dashboard-header.component";
import { RouterOutlet } from "@angular/router";
import { NavigationService } from "../../shared/services/navigation.service";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    SideMenuComponent,
    DashboardHeaderComponent,
    RouterOutlet,
    AsyncPipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  public readonly navService = inject(NavigationService);
}
