import { CategoriaDTO } from './../models/categoria.dto';
import { API_CONFIG } from './../configs/api.config';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CategoriaService {

  constructor(
    public httpClient: HttpClient
  ) {}

  findAll() : Observable <CategoriaDTO[]> {
    return this.httpClient.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
  }

}
