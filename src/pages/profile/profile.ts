import { ClienteService } from './../../services/cliente.service';
import { ClienteDTO } from './../../models/cliente.dto';
import { LocalStorageService } from './../../login/local_storage.service';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../configs/api.config';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  clienteDTO: ClienteDTO

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
        this.clienteDTO = response as ClienteDTO;
        this.getImageIfExists();
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

  getImageIfExists() {
    this.clienteService.getImageFromBucket(this.clienteDTO.id)
    .subscribe(response => {
      this.clienteDTO.urlImagem = `${API_CONFIG.bucketBaseUrl}/cp${this.clienteDTO.id}.png`;
    },
    error => {});
  }

}
