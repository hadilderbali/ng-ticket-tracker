import { Component } from '@angular/core';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css']
})
export class TvComponent {

  listTv:any[]=[]

  ngOnInit(){
    this.listTv=[
      {id:2,title:'TV1',price:2000,quantity:10,nbrLike:0,image:"../../assets/images/tv.jpg"},
      {id:3,title:'TV2',price:2000,quantity:10,nbrLike:0,image:"../../assets/images/tv.jpg"},
      {id:4,title:'TV3',price:2000,quantity:10,nbrLike:0,image:"../../assets/images/tv.jpg"},
    ]
  }

  affiche(p:any){
    p.nbrLike++
  }
}
