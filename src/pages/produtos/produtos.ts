import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

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

  constructor(
    public navController: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public loadingController: LoadingController
    ) {
  }

  ionViewDidLoad() {
    let categoriaId = this.navParams.get('categoriaId');
    let loader = this.presentLoading();
    this.produtoService.findByCategoria(categoriaId)
      .subscribe(response => {
        this.produtos = response['content'];
        loader.dismiss();
        this.loadImageUrls();
      },
      error => {
        loader.dismiss();
      });
  }

  loadImageUrls() {
    for (let i = 0; i < this.produtos.length; i++) {
      let produto = this.produtos[i];
      this.produtoService.getSmallImageFromBucket(produto.id)
        .subscribe(response => {
          console.log('JSON do response: ' + JSON.stringify(response));
          produto.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${produto.id}-small.jpg`;
        }, error => {});
    }
  }

  showDetail(produtoId: string) {
    this.navController.push('ProdutoDetailPage', {produtoId: produtoId});
  }

  presentLoading() {
    let loader = this.loadingController.create({
      content: "Please wait..."
    });
    loader.present();
    return loader;
  }

}
