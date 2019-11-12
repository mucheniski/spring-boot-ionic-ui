import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProdutoService } from './../../services/produto.service';
import { ProdutoDTO } from '../../models/produto.dto';
import { API_CONFIG } from '../../configs/api.config';


@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  produtos : ProdutoDTO[];

  constructor(public navController: NavController,
              public navParams: NavParams,
              public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    let categoriaId = this.navParams.get('categoriaId');
    this.produtoService.findByCategoria(categoriaId)
      .subscribe(response => {
        this.produtos = response['content'];
        this.loadImageUrls();
      },
      error => {});
  }

  loadImageUrls() {
    for (let i = 0; i < this.produtos.length; i++) {
      let produto = this.produtos[i];
      this.produtoService.getSmallImageFromBucket(produto.id)
        .subscribe(response => {
          produto.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${produto.id}-small.jpg`;
        }, error => {});
    }
  }

  showDetail() {
    this.navController.push('ProdutoDetailPage');
  }

}
