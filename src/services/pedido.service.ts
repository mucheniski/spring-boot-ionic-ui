import { API_CONFIG } from './../configs/api.config';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { PedidoDTO } from './../models/pedido.dto';

@Injectable()
export class PedidoService {

  constructor(
    public httpClient: HttpClient
  ) {}

  insert(pedido: PedidoDTO) {
    return this.httpClient.post(`${API_CONFIG.baseUrl}/pedidos`, pedido, {observe: 'response', responseType: 'text'});
  }

}
