import { Component } from '@angular/core';
import { LanguageSwitcherComponent } from "../../../shared/components/language-switcher/language-switcher.component";

@Component({
  selector: 'app-landing-header',
  standalone: true,
  imports: [
    LanguageSwitcherComponent
  ],
  templateUrl: './landing-header.component.html',
  styleUrl: './landing-header.component.scss'
})
export class LandingHeaderComponent {

}
