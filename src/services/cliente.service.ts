import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";

import { ClienteDTO } from "../models/cliente.dto";
import { API_CONFIG } from "../configs/api.config";
import { LocalStorageService } from "../login/local_storage.service";
import { ImageUtilService } from './image-util.service';

@Injectable()
export class ClienteService {
  constructor(
    public httpClient: HttpClient,
    public localStorageService: LocalStorageService,
    public imageUtilService: ImageUtilService) {
  }

  findById(id: string) {
    return this.httpClient.get(`${API_CONFIG.baseUrl}/clientes/${id}`);
  }

  findByEmail(email: string) {
      return this.httpClient.get(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
  }

  getImageFromBucket(id : string) : Observable<any> {
      let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.png`
      return this.httpClient.get(url, {responseType : 'blob'});
  }

  insert(cliente: ClienteDTO) {
    return this.httpClient.post(`${API_CONFIG.baseUrl}/clientes`, cliente, {observe: 'response', responseType: 'text'});
  }

  uploadPicture(picture) {
    let pictureBlod = this.imageUtilService.dataUriToBlob(picture);
    let formData: FormData = new FormData();
    formData.set('multipartFile', pictureBlod, 'file.png')
    return this.httpClient.post(`${API_CONFIG.baseUrl}/clientes/picture`, formData, {observe: 'response', responseType: 'text'});
  }

}
