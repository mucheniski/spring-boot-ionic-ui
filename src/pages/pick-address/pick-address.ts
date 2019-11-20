import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ClienteService } from './../../services/cliente.service';
import { EnderecoDTO } from '../../models/edereco.dto';
import { LocalStorageService } from '../../login/local_storage.service';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  enderecos: EnderecoDTO[];

  constructor(
    public navController: NavController,
    public navParams: NavParams,
    public localStorageService: LocalStorageService,
    public clienteService: ClienteService) {
  }

  ionViewDidLoad() {
    let localStorageUser = this.localStorageService.getLocalStorageUser();
    if (localStorageUser && localStorageUser.email) {
      this.clienteService.findByEmail(localStorageUser.email)
      .subscribe(response => {
        this.enderecos = response['enderecos'];
      },
      error => {
        if (error.status == 403) {
          this.navController.setRoot('HomePage');
        }
      });
    }
    else {
      this.navController.setRoot('HomePage');
    }
  }

}
