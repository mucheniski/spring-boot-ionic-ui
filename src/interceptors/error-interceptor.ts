import { FieldMessage } from './../models/filedmessage';
import { LocalStorageService } from './../login/local_storage.service';

import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { AlertController } from 'ionic-angular';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public localStorageService: LocalStorageService,
                public alertController: AlertController) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Passou no error-interceptor");
        return next.handle(req)
        .catch((error, caught) => {

            let errorObj = error;
            if (errorObj.error) {
                errorObj = errorObj.error;
            }
            if (!errorObj.status) {
                errorObj = JSON.parse(errorObj);
            }

            console.log("Erro detectado pelo interceptor:");
            console.log(errorObj);

            switch (errorObj.status) {
              case 401:
              this.error401Handler();
              break;

              case 403:
              this.error403Handler();
              break;

              case 422:
              this.error422Handler(errorObj);
              break;

              default:
              this.errorDefautlHandler(errorObj);

            }

            return Observable.throw(errorObj);
        }) as any;
    }

    error401Handler() {
      let alert = this.alertController.create({
        title: 'Erro 401: Falha de autenticação',
        message: 'Email ou senha incorretos',
        enableBackdropDismiss: false,
        buttons: [{text: 'OK'}]
      });
      alert.present();
    }

    error403Handler() {
      this.localStorageService.setLocalStorageUser(null);
      let alert = this.alertController.create({
        title: 'Erro 403: Não autorizado',
        message: 'Email ou senha incorretos',
        enableBackdropDismiss: false,
        buttons: [{text: 'OK'}]
      });
      alert.present();
    }

    error422Handler(errorObj) {
      let alert = this.alertController.create({
        title: 'Erro 422: Validação!',
        message: this.listErros(errorObj.errors),
        enableBackdropDismiss: false,
        buttons: [{text: 'OK'}]
      });
      alert.present();
    }

    errorDefautlHandler(errorObj) {
      let alert = this.alertController.create({
        title: 'Erro ' + errorObj.status + ': ' + errorObj.error,
        message: errorObj.message,
        enableBackdropDismiss: false,
        buttons: [{text: 'OK'}]
      });
      alert.present();
    }

    listErros(messages: FieldMessage[]) : string {
      let text: string = '';
      for (let i = 0; i < messages.length; i++) {
        text = text + '<p><strong>' + messages[i].fieldName + "</strong>: " + messages[i].message + '</p>';
      }
      return text;
    }

}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};
