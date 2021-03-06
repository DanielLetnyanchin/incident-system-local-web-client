import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { GlobalErrorHandler } from './global-error-handler';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/';

@Injectable()
export class HandleHttpErrorInterceptor implements HttpInterceptor {

    constructor(private globalErrorHandler: GlobalErrorHandler) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
          .pipe(
              catchError((error: HttpErrorResponse) => {
                  if (error.error instanceof Error) {
                    // client-side or network error
                    const errorToLog = `Http error (client/network). ${error.message}`;
                    this.globalErrorHandler.handleError(errorToLog);
                  } else {
                    // unsuccesful response code
                    // tslint:disable-next-line:max-line-length
                    const errorToLog = `Http error (unsuccessful reponse). Message: ${error.message}, status code: ${(error).status}, body: ${JSON.stringify(error.error)} `;
                    this.globalErrorHandler.handleError(errorToLog);
                  }
                  return of(new HttpResponse());
                  }
                )
            );
    }
}

