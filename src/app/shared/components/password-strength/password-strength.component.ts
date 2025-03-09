import {Component, input, InputSignal} from '@angular/core';

export interface PasswordStrength {
  lowercase: boolean;
  uppercase: boolean;
  number: boolean;
  length: boolean;
}

@Component({
  selector: 'app-password-strength',
  standalone: true,
  imports: [],
  templateUrl: './password-strength.component.html',
  styleUrl: './password-strength.component.scss'
})
export class PasswordStrengthComponent {
  passwordStrengthData: InputSignal<PasswordStrength | null> = input<PasswordStrength | null>(null);
}
