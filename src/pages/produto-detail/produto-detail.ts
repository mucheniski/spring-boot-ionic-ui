import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProdutoService } from './../../services/produto.service';
import { ProdutoDTO } from '../../models/produto.dto';
import { API_CONFIG } from '../../configs/api.config';

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  produto: ProdutoDTO;

  constructor(
    public nacController: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    let produtoId = this.navParams.get('produtoId');
    this.produtoService.findById(produtoId)
      .subscribe(response => {
        this.produto = response;
        this.getImageUrlIfExists();
      },
      error => {});
  }

  getImageUrlIfExists() {
    this.produtoService.getImageFromBucket(this.produto.id)
      .subscribe(response => {
        this.produto.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.produto.id}.jpg`;
      },
      error => {});
  }

}
