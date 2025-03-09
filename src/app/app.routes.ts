import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { AuthComponent } from './pages/landing/auth/auth.component';
import { RegistrationComponent } from "./pages/landing/registration/registration.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import {PasswordRecoveryComponent} from "./pages/landing/password-recovery/password-recovery.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'landing',
    loadComponent: () => LandingComponent,
    children: [
      {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
      },
      {
        path: 'auth',
        loadComponent: () => AuthComponent
      },
      {
        path: 'registration',
        loadComponent: () => RegistrationComponent
      },
      {
        path: 'password-recovery',
        loadComponent: () => PasswordRecoveryComponent
      }
    ]
  },
  {
    path: 'dashboard',
    loadComponent: () => DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'jobs',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'landing'
  }
];
