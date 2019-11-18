import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {Router} from '@angular/router';

import{AuthService} from '../auth.service';
import { Loginuser } from '../shared/loginuser';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  isSubmitted=false;
  loginuser:Loginuser;

  constructor(private authService:AuthService,
    private router:Router,
    private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.loginForm=this.formBuilder.group({
      email:['',Validators.compose([ Validators.required,Validators.email])],
      password:['',[Validators.required,Validators.pattern('^[a-zA-Z]+$')]]
    });
  }

  get formControls(){return this.loginForm.controls;}
  login()
  {
    console.log(this.loginForm.value);
    this.isSubmitted=true;
    if(this.loginForm.invalid){
      return;
    }
    this.authService.login(this.loginForm.value).subscribe(data=>{
      data.forEach(element => {
        this.loginuser.roleid==element["roleid"];
        console.log(this.loginuser.roleid);
        if(this.loginuser.roleid==2)
        {
          this.router.navigate(['products'])
        }
        else if(this.loginuser.roleid==3)
         { this.router.navigate(['user'])
        }
        else{
          this.router.navigate(['login'])
        }
        
      });
    })
    
  }
}

