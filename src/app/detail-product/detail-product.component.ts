import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent {
   constructor(private Act:ActivatedRoute) { }

   id!:number;
   ngOnInit(){
    this.id=this.Act.snapshot.params['id']
   }

}
