import { LocalStorageService } from './../../login/local_storage.service';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  email: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public localStorageService: LocalStorageService) {
  }

  ionViewDidLoad() {
    let localStorageUser = this.localStorageService.getLocalStorageUser();
    if (localStorageUser && localStorageUser.email) {
      this.email = localStorageUser.email;
    }
  }

}
