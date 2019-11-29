import { ClienteService } from './../../services/cliente.service';
import { ClienteDTO } from './../../models/cliente.dto';
import { LocalStorageService } from './../../login/local_storage.service';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../configs/api.config';
import { CameraOptions, Camera } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  clienteDTO: ClienteDTO;
  picture: string;
  cameraOn: boolean = false;

  constructor(
    public navController: NavController,
    public navParams: NavParams,
    public localStorageService: LocalStorageService,
    public clienteService: ClienteService,
    public camera: Camera) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  getImageIfExists() {
    this.clienteService.getImageFromBucket(this.clienteDTO.id)
    .subscribe(response => {
      this.clienteDTO.urlImagem = `${API_CONFIG.bucketBaseUrl}/cp${this.clienteDTO.id}.png`;
    },
    error => {});
  }

  getCameraPicture() {

    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
     this.picture = 'data:image/png;base64,' + imageData;
     this.cameraOn = false;
    }, (err) => {
    });
  }

  uploadPicture() {
    this.clienteService.uploadPicture(this.picture)
      .subscribe(response => {
        this.picture = null;
        this.loadData();
      },
      error => {});
  }

  cancelUpload() {
    this.picture = null;
  }

  loadData() {
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

}
