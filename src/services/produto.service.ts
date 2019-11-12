import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_CONFIG } from '../configs/api.config';

@Injectable()
export class ProdutoService {

  constructor(public httpClient: HttpClient) {
  }

  findByCategoria(categoriaId : string) {
    return this.httpClient.get(`${API_CONFIG.baseUrl}/produtos/page/?categorias=${categoriaId}`);
  }

  getSmallImageFromBucket(id: string) : Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`
    return this.httpClient.get(url, {responseType: 'blob'});
  }

}
