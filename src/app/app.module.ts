import { ClienteService } from './../services/cliente.service';
import { LocalStorageService } from './../login/local_storage.service';
import { LoginService } from './../login/login.service';
import { CategoriaService } from './../services/categoria.service';
import { ErrorInterceptorProvider } from '../interceptors/error-interceptor';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CategoriaService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ErrorInterceptorProvider,
    LoginService,
    LocalStorageService,
    ClienteService
  ]
})
export class AppModule {}
