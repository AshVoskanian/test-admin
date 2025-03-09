import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize, throwError } from 'rxjs';
import { LoadingService } from "./shared/services/loader.service";
import { AuthService } from "./shared/services/auth.service";

const urlsWithoutLoader: Array<string> = ['/assets/i18n/'];
let isUnauthorizedToastShown = false;

export const Interceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);
  const authService = inject(AuthService);
  const loadingService = inject(LoadingService);
  const token = authService.getToken();

  // Check if the request must be without loader
  const isReqWithoutLoader = urlsWithoutLoader.some(url => req.url.startsWith(url));

  if (!isReqWithoutLoader) {
    loadingService.show();
  }

  const clonedRequest = req.clone({
    setHeaders: {
      'authorization': `Bearer ${token}`,
    }
  });

  return next(clonedRequest).pipe(
    finalize(() => {
      if (!isReqWithoutLoader) {
        loadingService.hide();
      }
    }),
    catchError((error) => {
      let errorMessage = error?.error?.error || error?.statusText;

      // Customize error messages based on error status
      if (error.status === 401) {
        errorMessage = 'Unauthorized access. Please check your credentials.';
        if (!isUnauthorizedToastShown) {
          isUnauthorizedToastShown = true;
          toastr.error(errorMessage, 'Error');
        }
        authService.logout();
      } else if (error.status === 403) {
        errorMessage = 'Forbidden. You do not have permission to access this resource.';
        toastr.error(errorMessage, 'Error');
      } else if (error.status === 404) {
        errorMessage = 'Resource not found. Please check the URL.';
        toastr.error(errorMessage, 'Error');
      } else if (error.status >= 500) {
        errorMessage = 'Server error. Please try again later.';
        toastr.error(errorMessage, 'Error');
      }

      // Log error to console for debugging
      console.error('HTTP Error:', error);

      // Re-throw the error so it can be handled by other parts of the application if needed
      return throwError(() => error);
    })
  );
};
