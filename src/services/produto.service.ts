import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { API_CONFIG } from '../configs/api.config';

@Injectable()
export class ProdutoService {

  constructor(public http: HttpClient) {
  }

  findByCategoria(categoriaId : string) {
    return this.http.get(`${API_CONFIG.baseUrl}/produtos/page/?categorias=${categoriaId}`);
  }
}
