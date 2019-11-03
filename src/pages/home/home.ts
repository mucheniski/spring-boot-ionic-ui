import { LocalStorageService } from './../../login/local_storage.service';
import { LoginService } from './../../login/login.service';
import { LoginDTO } from '../../login/login.dto';

import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loginDTO: LoginDTO = {
    email: "",
    senha: ""
  }

  constructor(
    public navController: NavController,
    public menuController: MenuController,
    public loginService: LoginService,
    public localStorageService: LocalStorageService
  ) { }

  ionViewWillEnter() {
    this.menuController.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menuController.swipeEnable(true);
  }

  ionViewDidEnter(){
    if (this.localStorageService.getLocalStorageUser() != null) {
      this.loginService.refreshToken()
      .subscribe(response => {
        this.loginService.successfulLogin(response.headers.get('Authorization'));
        this.navController.setRoot('CategoriasPage');
      },
      error => {});
    }
  }

  login() {
    this.loginService.authenticate(this.loginDTO)
      .subscribe(response => {
        this.loginService.successfulLogin(response.headers.get('Authorization'));
        this.navController.setRoot('CategoriasPage');
      },
      error => {
        this.navController.setRoot('HomePage');
      });
  }

}
