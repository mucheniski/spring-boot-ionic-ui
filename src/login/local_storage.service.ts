import { Cart } from './../models/cart';
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

  setLocalStorageUser(localStorageUser : Cart) {
    if (localStorageUser == null) {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.localStorageUser);
    }
    else {
      localStorage.setItem(LOCAL_STORAGE_KEYS.localStorageUser, JSON.stringify(localStorageUser));
    }
  }

  getLocalStorageCart() : Cart {
    let cart = localStorage.getItem(LOCAL_STORAGE_KEYS.localStorageCart);
    if (cart == null) {
      return null;
    }
    else {
      return JSON.parse(cart);
    }
  }

  setLocalStorageCart(localStorageCart : Cart) {
    if (localStorageCart == null) {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.localStorageCart);
    }
    else {
      localStorage.setItem(LOCAL_STORAGE_KEYS.localStorageCart, JSON.stringify(localStorageCart));
    }
  }

}
