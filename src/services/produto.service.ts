import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_CONFIG } from '../configs/api.config';
import { ProdutoDTO } from '../models/produto.dto';

@Injectable()
export class ProdutoService {

  constructor(public httpClient: HttpClient) {
  }

  findById(produtoId: string) {
    return this.httpClient.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${produtoId}`);
  }

  findByCategoria(categoriaId: string, page: number = 0, linesPerPage: number = 24) {
    return this.httpClient.get(`${API_CONFIG.baseUrl}/produtos/page/?categorias=${categoriaId}&page=${page}&linesPerPage=${linesPerPage}`);
  }

  getSmallImageFromBucket(id: string) : Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`
    return this.httpClient.get(url, {responseType: 'blob'});
  }

  getImageFromBucket(id: string) : Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`
    return this.httpClient.get(url, {responseType: 'blob'});
  }

}
