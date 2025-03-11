import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpClient, provideHttpClient, withInterceptors } from "@angular/common/http";
import { HttpLoaderFactory } from "./shared/laoders/translate.loader";
import { provideToastr } from "ngx-toastr";
import { provideAnimations } from "@angular/platform-browser/animations";
import { Interceptor } from "./interceptor";
import { provideQuillConfig } from "ngx-quill";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([ Interceptor ])),
    provideAnimations(),
    provideToastr(),
    provideQuillConfig({
      sanitize: true,
      placeholder: 'Write your feedback here...',
      modules: {
        toolbar: [
          [ 'bold', 'italic', 'underline', 'strike' ],        // toggled buttons
          [ 'blockquote', 'code-block' ],

          [ { 'list': 'ordered' }, { 'list': 'bullet' } ],

          [ { 'size': [ 'small', false, 'large', 'huge' ] } ],  // custom dropdown
          [ { 'header': [ 1, 2, 3, 4, 5, 6, false ] } ],
          [ { 'align': [] } ],
        ]
      }
    }),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [ HttpClient ],
        },
      })),
  ]
};
