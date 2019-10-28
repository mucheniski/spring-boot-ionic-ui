import { LOCAL_STORAGE_KEYS } from './../configs/local_storage_keys.configs';
import { LocalStorageUser } from './local_storage_user';

import { Injectable } from "@angular/core";

@Injectable()
export class LocalStorageService {

  getLocalStorageUser() : LocalStorageUser {
    let user = localStorage.getItem(LOCAL_STORAGE_KEYS.localStorageUser);
    if (user == null) {
      return null;
    }
    else {
      return JSON.parse(user);
    }
  }

  setLocalStorageUser(localStorageUser : LocalStorageUser) {
    if (localStorageUser == null) {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.localStorageUser);
    }
    else {
      localStorage.setItem(LOCAL_STORAGE_KEYS.localStorageUser, JSON.stringify(localStorageUser));
    }
  }

}
