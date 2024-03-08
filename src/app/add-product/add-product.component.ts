import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { ConsumerProductService } from '../services/consumer-product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  constructor(private ps:ProductService, private route :Router ,private conP:ConsumerProductService) { }

  registerForm=new FormGroup({
    id:new FormControl('',Validators.required),
    title:new FormControl('',[Validators.required,Validators.minLength(5)]),
    price:new FormControl('',Validators.required),
    quantity:new FormControl('',Validators.required),
    nbrLike:new FormControl('',Validators.required),

  })
  save(){
    // console.log(this.registerForm)
    // this.ps.addProduct(this.registerForm.value as any)
    // this.route.navigateByUrl('/product')

    this.conP.addProduct(this.registerForm.value as any).subscribe(
      ()=>this.route.navigateByUrl('/product'),
    )

  }
}
