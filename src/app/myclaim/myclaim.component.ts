import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Claim } from 'Claim';
import { Insurance } from 'Insurance';
import { LocalStorageService } from 'ngx-webstorage';
import { User } from 'User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-myclaim',
  templateUrl: './myclaim.component.html',
  styleUrls: ['./myclaim.component.css']
})
export class MyclaimComponent implements OnInit {

  user:User;
  claim: Claim[] = [];
  insurance:Insurance[];
  email:"";
  constructor(private userServ: UserService,private router:Router, public storage: LocalStorageService) { }

  ngOnInit(): void {
    if(!this.storage.retrieve("isLoggedIn"))
    {
      alert("please login to continue");
       this.router.navigate(["/"]);
    }
    this.email=this.storage.retrieve("email");
    this.getUser();
  
    
  }

  getUser(){
    this.userServ.getUserEmail(this.email).subscribe(data => {
      this.user = data;
      console.log(this.user);

      this.insurance = this.user.insurance;
      // this.user.insurance.forEach(e=>{
      //   e.claimIns.forEach(el=>{
      //     this.claim.push(el);
       
      //   });
      // });
      // this.insurance.sort(function(a,b){
      //   // Turn your strings into dates, and then subtract them
      //   // to get a value that is either negative, positive, or zero.
      //   return new Date(b..claim_date).getTime() - new Date(a.claim_date).getTime();
      // });
      this.insurance.forEach( e=>{
        e.claimIns.sort(
          function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.claim_date).getTime() - new Date(a.claim_date).getTime();
          })
      })
      this.insurance.sort(function(a ,b){
        return new Date(b.start_date).getTime() - new Date(a.start_date).getTime();
      })
      console.log(this.claim);
    });
  }

}
