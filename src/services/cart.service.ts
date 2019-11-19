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

  removeItem(produtoDTO : ProdutoDTO) : Cart {
    let cart = this.getCart();
    let itemPosition = cart.items.findIndex(item => item.produto.id == produtoDTO.id);
    if (itemPosition != -1) {
      cart.items.splice(itemPosition, 1);
    }
    this.localStorageService.setLocalStorageCart(cart);
    return cart;
  }

  increaseQuantity(produtoDTO : ProdutoDTO) : Cart {
    let cart = this.getCart();
    let itemPosition = cart.items.findIndex(item => item.produto.id == produtoDTO.id);
    if (itemPosition != -1) {
      cart.items[itemPosition].quantidade++;
    }
    this.localStorageService.setLocalStorageCart(cart);
    return cart;
  }

  decreaseQuantity(produtoDTO : ProdutoDTO) : Cart {
    let cart = this.getCart();
    let itemPosition = cart.items.findIndex(item => item.produto.id == produtoDTO.id);
    if (itemPosition != -1) {
      cart.items[itemPosition].quantidade--;
      if (cart.items[itemPosition].quantidade < 1) {
        cart = this.removeItem(produtoDTO);
      }
    }
    this.localStorageService.setLocalStorageCart(cart);
    return cart;
  }

  total() : number {
    let cart = this.getCart();
    let sum = 0;
    for (var i=0; i<cart.items.length; i++) {
      sum += cart.items[i].produto.preco * cart.items[i].quantidade;
    }
    return sum;
  }

}
