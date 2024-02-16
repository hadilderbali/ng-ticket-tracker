import { Component } from '@angular/core';
import { Product } from '../model/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  priceMax!:number
  listProduct:Product[]=[
    {id: 1, title: 'product 1', price: 100, quantity: 5 , nbrLike : 0},
    {id: 2, title: 'product 2', price: 200, quantity: 10, nbrLike : 0},
    {id: 3, title: 'product 3', price: 300, quantity: 15, nbrLike : 0},
  ]

  increment(id:number){
    this.listProduct[id].nbrLike++;
  }
  buy(id:number){
  //  if(this.listProduct[id].quantity>0)
    this.listProduct[id].quantity--;
  }
}
