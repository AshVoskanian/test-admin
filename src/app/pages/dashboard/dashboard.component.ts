import { Component, inject } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { NavigationService } from "../../shared/services/navigation.service";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    AsyncPipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  public readonly navService = inject(NavigationService);
}
