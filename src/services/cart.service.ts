import { ProdutoDTO } from './../models/produto.dto';
import { LocalStorageService } from './../login/local_storage.service';

import { Injectable } from "@angular/core";
import { Cart } from '../models/cart';

@Injectable()
export class CartService {

  constructor(public localStorageService: LocalStorageService) {
  }

  createOrClearCart() : Cart {
    let cart: Cart = {items: []};
    this.localStorageService.setLocalStorageCart(cart);
    return cart;
  }

  getCart() : Cart {
    let cart : Cart = this.localStorageService.getLocalStorageCart();
    if (cart == null) {
      cart = this.createOrClearCart();
    }
    return cart;
  }

  addItem(produtoDTO : ProdutoDTO) : Cart {
    let cart = this.getCart();
    let itemPosition = cart.items.findIndex(item => item.produto.id == produtoDTO.id);
    if (itemPosition == -1) {
      cart.items.push({quantidade: 1, produto: produtoDTO});
    }
    this.localStorageService.setLocalStorageCart(cart);
    return cart;
  }

}
