import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  user:User = new User();
  validateUser: FormGroup;
  submitted: boolean = false;
  loggedIn: boolean = false;
  equalpassword:boolean = true;
  constructor(private formBuilder: FormBuilder, private userService: UserService, public router: Router) { }

  ngOnInit(): void {
    this.validateUser = this.formBuilder.group({
      l_email:['',[Validators.required,Validators.pattern("[^ @]*@[^ @]*")]],
      l_pwd: ['',[Validators.required,Validators.minLength(6)]],
      c_pwd:['',[Validators.required,Validators.minLength(6)]],
    });
  }
  
  onLogin(){
    this.submitted = true;
    console.log(this.validateUser)
    if(this.validateUser.invalid){
      
      return;
    }
    else if(this.validateUser.controls['l_pwd']?.value != this.validateUser.controls['c_pwd']?.value)
    {
      this.equalpassword = false;
    }
    else{
      this.equalpassword = true;
      this.submitted=false; 
      this.verifyUser(this.user);
    }
  }
  
  verifyUser(user:User){
      this.userService.changeUserPassword(user).subscribe(data => {
        if(data)
        {
           alert("password changed successfully");
           this.router.navigate(["/"]);
        }
      });
  }

}
