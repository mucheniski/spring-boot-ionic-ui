import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CartService } from './../../services/cart.service';
import { PedidoDTO } from './../../models/pedido.dto';
import { ClienteService } from './../../services/cliente.service';
import { EnderecoDTO } from '../../models/edereco.dto';
import { LocalStorageService } from '../../login/local_storage.service';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  enderecos: EnderecoDTO[];
  pedido: PedidoDTO;

  constructor(
    public navController: NavController,
    public navParams: NavParams,
    public localStorageService: LocalStorageService,
    public clienteService: ClienteService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    let localStorageUser = this.localStorageService.getLocalStorageUser();
    if (localStorageUser && localStorageUser.email) {
      this.clienteService.findByEmail(localStorageUser.email)
      .subscribe(response => {
        this.enderecos = response['enderecos'];

        let cart = this.cartService.getCart();

        this.pedido = {
          cliente: {id: response['id']},
          enderecoEntregra: null,
          pagamento: null,
          itens: cart.items.map(item => { return {quantidade: item.quantidade , produto: {id: item.produto.id}}})
        }
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

  nextPage(endereco: EnderecoDTO) {
    this.pedido.enderecoEntregra = {id: endereco.id};
    console.log(this.pedido);
  }

}
