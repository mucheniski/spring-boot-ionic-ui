import { API_CONFIG } from './../configs/api.config';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';
import { CidadeDTO } from '../models/cidade.dto';

@Injectable()
export class CidadeService {

  constructor(
    public httpClient: HttpClient
  ) {}

  findAll(estadoId : string) : Observable <CidadeDTO[]> {
    return this.httpClient.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/estados/${estadoId}/cidades`);
  }

}
