import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title:string = 'Welcome 4SE4';
  color:string = 'red';
  listusers:any= [
    {id: 1, name: 'John', age: 25},
    {id: 2, name: 'ahmed', age: 20},
    {id: 3, name: 'salma', age: 28},
  ]

  msg(){
    alert('hello')
  }
}
