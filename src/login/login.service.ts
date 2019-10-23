import { API_CONFIG } from './../configs/api.config';
import { LoginDTO } from './login.dto';

import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService {

  constructor(public httpClient: HttpClient) {
  }

  authenticate(loginDTO : LoginDTO) {
    return this.httpClient.post(`${API_CONFIG.baseUrl}/login`, loginDTO, { observe: 'response', responseType: 'text'})
  }

}
