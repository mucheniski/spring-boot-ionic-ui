import { API_CONFIG } from './../configs/api.config';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';
import { EstadoDTO } from '../models/estado.dto';

@Injectable()
export class EstadoService {

  constructor(
    public httpClient: HttpClient
  ) {}

  findAll() : Observable <EstadoDTO[]> {
    return this.httpClient.get<EstadoDTO[]>(`${API_CONFIG.baseUrl}/estados`);
  }

}
