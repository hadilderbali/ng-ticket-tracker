import { Component } from '@angular/core';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css']
})
export class MobileComponent {
  listMobile:any[]=[]

  ngOnInit(){
    this.listMobile=[
      {id:2,title:'iphone 12',price:2000,quantity:10,nbrLike:0,image:"../../assets/images/iphone.jpg"},
      {id:3,title:'iphone 13',price:2000,quantity:10,nbrLike:0,image:"../../assets/images/iphone.jpg"},
      {id:4,title:'iphone 14',price:2000,quantity:10,nbrLike:0,image:"../../assets/images/iphone.jpg"},
    ]
  }
}
