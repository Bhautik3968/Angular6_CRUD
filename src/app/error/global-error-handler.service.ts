import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Error } from './error';
import { TestAPIService } from '../test-api.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
//ErrorHandler is created before the providers. So we need Injector for dependency injection in our custom error handler class.
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(error: any) {
    let router = this.injector.get(Router);
    let service = this.injector.get(TestAPIService);
    let dbError = new Error();
    if (error instanceof HttpErrorResponse) {
      dbError.StatusCode = error.status
    }
    dbError.ErrorDescription = error.message;
    dbError.ErrorMessage = error.message;
    dbError.URL = router.url
    service.SaveError(dbError).subscribe(data => {
      router.navigate([`error/${data.ID}`]);
    },
      err => {
        console.log(err)
      });
  }
}
