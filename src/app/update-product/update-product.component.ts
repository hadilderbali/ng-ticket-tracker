import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsumerProductService } from '../services/consumer-product.service';
import { Product } from '../model/product';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {
  id!:number
  p!:Product
  constructor( private route :Router ,private conP:ConsumerProductService,private act:ActivatedRoute) { }

  registerForm=new FormGroup({
    id:new FormControl('',Validators.required),
    title:new FormControl('',[Validators.required,Validators.minLength(5)]),
    price:new FormControl('',Validators.required),
    quantity:new FormControl('',Validators.required),
    nbrLike:new FormControl('',Validators.required),

  })

  ngOnInit(){
    //- recuperer l'id depuis l'url
    this.id=this.act.snapshot.params['id']
    //- recuperer l'objet
    this.conP.getProductById(this.id).subscribe(
      (product)=>{
        this.p=product
        // remplir formulaire avec l'objet P
        this.registerForm.patchValue(this.p as any)
      })
  }
  save(){
    this.conP.updateProduct(this.registerForm.value as any,this.id).subscribe(
      ()=>this.route.navigateByUrl('/product')
    )
  }
}
