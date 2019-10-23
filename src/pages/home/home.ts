import { LoginDTO } from './../../models/login.dto';
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
    public menuController: MenuController
  ) { }

  ionViewWillEnter() {
    this.menuController.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menuController.swipeEnable(true);
  }

  login() {
    console.log(this.loginDTO);
    this.navController.setRoot('CategoriasPage');
  }

}
