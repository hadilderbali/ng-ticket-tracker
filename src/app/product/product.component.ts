import { Component } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';
import { CalculService } from '../services/calcul.service';
import { ConsumerProductService } from '../services/consumer-product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  constructor(private Ps:ProductService,private cl:CalculService,private conP:ConsumerProductService) { }
  priceMax!:number
  listProduct:Product[]=[]
  x!:number
  ngOnInit(){
    //this.listProduct=this.Ps.listProduct;
    this.conP.getProduct().subscribe({
      next:(data)=>this.listProduct=data,
      error:(error)=>console.log(error),
      complete:()=>console.log('completed')
    })
    this.x=this.cl.stat(this.listProduct,'quantity',0);
  }

  increment(id:number){
    this.listProduct[id].nbrLike++;
  }
  buy(id:number){
  //  if(this.listProduct[id].quantity>0)
    this.listProduct[id].quantity--;
  }


  supp(id:number){
    this.conP.deleteProduct(id).subscribe(
      ()=>this.ngOnInit()
    )
  }
}
