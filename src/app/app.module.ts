import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import { ClienteService } from './../services/cliente.service';
import { LocalStorageService } from './../login/local_storage.service';
import { LoginService } from './../login/login.service';
import { CategoriaService } from './../services/categoria.service';
import { ProdutoService } from '../services/produto.service';
import { ErrorInterceptorProvider } from '../interceptors/error-interceptor';
import { ImageUtilService } from '../services/image-util.service';
import { CartService } from './../services/cart.service';
import { LoginInterceptorProvider } from './../interceptors/login.interceptor';

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
    LoginInterceptorProvider,
    ErrorInterceptorProvider,
    LoginService,
    LocalStorageService,
    ClienteService,
    ProdutoService,
    CartService,
    ImageUtilService
  ]
})
export class AppModule {}
