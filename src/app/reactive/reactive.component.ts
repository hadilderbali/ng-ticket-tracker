import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent {

  login=new FormControl('',Validators.required)
  pwd=new FormControl('',Validators.required)


  registerForm=new FormGroup({
    cin:new FormControl('',[Validators.required,Validators.pattern('[0-9]{8}')]),
    name:new FormControl('',[Validators.required,Validators.minLength(5)]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',Validators.required),

  })
  save(){
    console.log(this.registerForm)

  }
}
