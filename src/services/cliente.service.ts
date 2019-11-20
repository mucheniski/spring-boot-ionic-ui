import { ClienteDTO } from "../models/cliente.dto";
import { API_CONFIG } from "../configs/api.config";

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { LocalStorageService } from "../login/local_storage.service";

@Injectable()
export class ClienteService {
  constructor(
    public httpClient: HttpClient,
    public localStorageService: LocalStorageService) {
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

}
