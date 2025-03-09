import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { LandingHeaderComponent } from "../../core/components/landing-header/landing-header.component";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    RouterOutlet,
    LandingHeaderComponent
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
}
