import { Injectable } from '@angular/core';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  listProduct:Product[]=[
    {id: 1, title: 'product 1', price: 100, quantity: 5 , nbrLike : 0},
    {id: 2, title: 'product 2', price: 200, quantity: 10, nbrLike : 0},
    {id: 3, title: 'product 3', price: 300, quantity: 15, nbrLike : 0},
  ]
  constructor() { }

  addProduct(p:Product){
    this.listProduct.push(p)
  }
}
