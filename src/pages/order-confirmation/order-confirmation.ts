import { PedidoService } from './../../services/pedido.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ClienteService } from './../../services/cliente.service';
import { EnderecoDTO } from './../../models/edereco.dto';
import { ClienteDTO } from './../../models/cliente.dto';
import { CartItem } from './../../models/cart-item';
import { CartService } from './../../services/cart.service';
import { PedidoDTO } from './../../models/pedido.dto';

@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  pedido: PedidoDTO;
  cartItems: CartItem[];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;

  constructor(
    public navController: NavController,
    public navParams: NavParams,
    public cartService: CartService,
    public clienteService: ClienteService,
    public pedidoService: PedidoService) {

      this.pedido = this.navParams.get('pedido');
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;
    this.clienteService.findById(this.pedido.cliente.id)
      .subscribe(response => {
        this.cliente = response as ClienteDTO;
        this.endereco = this.findEndereco(this.pedido.enderecoEntregra.id, response['enderecos']);
      },
      error => {
        this.navController.setRoot('HomePage');
      })
  }

  private findEndereco(enderecoId: string, enderecosCliente: EnderecoDTO[]) : EnderecoDTO {
    let position = enderecosCliente.findIndex(endereco => endereco.id == enderecoId);
    return enderecosCliente[position];
  }

  total() {
    return this.cartService.total();
  }

  back() {
    this.navController.setRoot('CartPage');
  }

  checkout() {
    this.pedidoService.insert(this.pedido)
      .subscribe(response => {
        this.cartService.createOrClearCart();
        console.log(response.headers.get('location'));
      },
      error => {
        if (error.status == 403) {
          this.navController.setRoot('HomePage');
        }
      });
  }
  }

}
