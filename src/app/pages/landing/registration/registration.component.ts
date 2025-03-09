import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { InputComponent } from "../../../shared/components/input/input.component";
import { RegisterFormComponent } from "../../../shared/components/register-form/register-form.component";

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    RouterLink,
    InputComponent,
    RegisterFormComponent
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {

}
