import { LocalStorageService } from './local_storage.service';
import { LocalStorageUser } from './local_storage_user';
import { API_CONFIG } from './../configs/api.config';
import { LoginDTO } from './login.dto';

import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService {

  constructor(public httpClient: HttpClient,
              public localStorageService: LocalStorageService
    ) {
  }

  authenticate(loginDTO : LoginDTO) {
    return this.httpClient.post(`${API_CONFIG.baseUrl}/login`, loginDTO, { observe: 'response', responseType: 'text'})
  }

  successfulLogin(authorizationValue : string) {
    let token = authorizationValue.substring(7);
    let user : LocalStorageUser = {
      token : token
    }
    this.localStorageService.setLocalStorageUser(user);
  }

  logout() {
    this.localStorageService.setLocalStorageUser(null);
  }

}
