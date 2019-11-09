import { CategoriaDTO } from './../../models/categoria.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { API_CONFIG } from './../../configs/api.config';
import { CategoriaService } from './../../services/categoria.service';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  items: CategoriaDTO[];
  bucketBaseUrl: string = API_CONFIG.bucketBaseUrl;

  constructor(
    public navController: NavController,
    public navParams: NavParams,
    public categoriaService: CategoriaService
  )
  {}

  ionViewDidLoad() {
    this.categoriaService.findAll()
      .subscribe( response => {
        this.items = response;
      },
      error => {});
  }

  showProdutos() {
    this.navController.push('ProdutosPage');
  }

}
