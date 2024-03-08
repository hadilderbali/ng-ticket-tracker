import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {



  @Input() p:any
  @Output() notif=new EventEmitter()

  sendData(){
    this.notif.emit(this.p)
  }
}
