import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'User';
import { UserService } from '../user.service';
import * as CryptoJS from 'crypto-js';  

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  addUser: FormGroup;
  submitted: boolean = false;
  signedUp: boolean = false;
  user : User = new User();
  password: string;

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.addUser= this.formBuilder.group({
      uname:['', [Validators.required]],
      email:['', [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]],
      pwd:['', [Validators.required, Validators.minLength(6)]],
      contact:['', [Validators.required,Validators.minLength(10), Validators.maxLength(10)]],
      addr:['', [Validators.required]],
      dob:['', [Validators.required]]
    });
  }

  // signup
  createUser(){
    console.log(this.user);

    this.userService.createUser(this.user).subscribe( data => {
      if(data)
      {
          alert("Account Created");
          this.addUser.reset();
      }
    }
    );
    this.signedUp = false;

  }

  
  onSignup() {
    this.submitted = true;
    console.log(this.addUser)

    if(this.addUser.invalid){
      alert("data is invalid");
      return;
    }
    if(this.addUser.valid){
      this.signedUp = true;
      this.submitted=false;
      this.createUser();
    }
  }

}
