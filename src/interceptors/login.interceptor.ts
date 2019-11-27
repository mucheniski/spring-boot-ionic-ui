import { API_CONFIG } from './../configs/api.config';
import { LocalStorageService } from './../login/local_storage.service';

import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO

@Injectable()
export class LoginInterceptor implements HttpInterceptor {

    constructor(public localStorageService: LocalStorageService) {}

    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let urlRequestSize = API_CONFIG.baseUrl.length;
        let isRequestNeedAuthorization = httpRequest.url.substring(0, urlRequestSize) == API_CONFIG.baseUrl;

        let localStorageUser = this.localStorageService.getLocalStorageUser();
        if (localStorageUser && isRequestNeedAuthorization) {
          const loginRequest = httpRequest.clone({headers: httpRequest.headers.set('Authorization', 'Bearer ' + localStorageUser.token)});
          return next.handle(loginRequest);
        }
        else {
          return next.handle(httpRequest);
        }
    }
}

export const LoginInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: LoginInterceptor,
    multi: true,
};
