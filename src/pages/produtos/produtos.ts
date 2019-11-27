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

  produtos: ProdutoDTO[] = [];
  page: number = 0;

  constructor(
    public navController: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public loadingController: LoadingController
    ) {
  }

  ionViewDidLoad() {
    this.loadData();
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

  doRefresh(refresher) {
    this.page = 0;
    this.produtos = [];
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.loadData();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }

  loadData() {
    let categoriaId = this.navParams.get('categoriaId');
    let loader = this.presentLoading();
    this.produtoService.findByCategoria(categoriaId, this.page, 10)
      .subscribe(response => {
        let start = this.produtos.length;
        this.produtos = this.produtos.concat(response['content']);
        let end = this.produtos.length - 1;
        loader.dismiss();
        console.log(this.page);
        console.log(this.produtos);
        this.loadImageUrls(start, end);
      },
      error => {
        loader.dismiss();
      });
  }


  loadImageUrls(start: number, end: number) {
    for (let i = start; i <= end; i++) {
      let produto = this.produtos[i];
      this.produtoService.getSmallImageFromBucket(produto.id)
        .subscribe(response => {
          produto.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${produto.id}-small.jpg`;
        }, error => {});
    }
  }

}
