import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'ngx-webstorage';
import { User } from 'User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validateUser: FormGroup;
  submitted: boolean = false;
  equalpassword:boolean = true;
  loggedIn: boolean = false;

  user: User = new User();


  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private userService: UserService,
     public storage : LocalStorageService, public router: Router) {}
  ngOnInit(): void {
    this.validateUser = this.formBuilder.group({
      l_email:['',[Validators.required,Validators.pattern("[^ @]*@[^ @]*")]],
      l_pwd: ['',[Validators.required,Validators.minLength(6)]]
    });
  }


  open(content: any) {
    this.modalService.open(content);
  }
  close(){
    this.modalService.dismissAll;
  }

  onlogout(){
    console.log('logout');
    this.loggedIn=false;
    this.storage.store("isLoggedIn",false);
    this.storage.store("email","");
    this.storage.store("uname","");
    this.router.navigate(["/"]);
    this.modalService.dismissAll();
  }

  //login
  onLogin(){
    this.submitted = true;
    console.log(this.validateUser)
    if(this.validateUser.invalid){
      return;
    }
    else{
      this.submitted=false; 
      this.verifyUser(this.user);
    }
  }

  verifyUser(user: User){
    this.userService.getUserByEmail(user).subscribe(data =>{
     
      console.log(data);

      if(data != null){
        this.loggedIn=true;
        this.equalpassword = true;
        this.storage.store("isLoggedIn",true);
        this.storage.store("email",data.email);
        this.storage.store("uname",data.name);
        this.validateUser.reset();
        this.modalService.dismissAll();
    
      
      } 
      else{
          this.equalpassword = false;
      }
    });
  }
  
  forgot()
  {
    this.modalService.dismissAll();
    this.router.navigate(["/forgotpassword"]);
  }
  
}
