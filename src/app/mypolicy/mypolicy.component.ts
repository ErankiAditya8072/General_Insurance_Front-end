import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Insurance } from 'Insurance';
import { LocalStorageService } from 'ngx-webstorage';
import { User } from 'User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-mypolicy',
  templateUrl: './mypolicy.component.html',
  styleUrls: ['./mypolicy.component.css']
})
export class MypolicyComponent implements OnInit {

  user: User;
  uins: Insurance[] = [];
  start_date: Date;
  claim_date: Date = new Date();

  constructor(public storage : LocalStorageService, public router: Router, private userServ: UserService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    if (!this.storage.retrieve('isLoggedIn')) {
      alert("Please login to continue")
      this.router.navigate(["/"]);
    }

    this.getUser(this.storage.retrieve('email'));
  }

  getUser(email:string){
    this.userServ.getAllInsuranceUser(email).subscribe( data=>{
      this.user = data;
      console.log(this.user);
      this.user.insurance.forEach(e => {
        console.log(e);
        this.uins.push(e);
      });
      console.log(this.uins);
    }
    )
  }

  open(content: any) {
    this.modalService.open(content);
  }
  close(){
    this.modalService.dismissAll;
  }

  FullyClaimed(status:string):boolean{
    console.log(status);
    if(status == 'Fully Claimed')
      return false;

    return true;
  }
  verifyPolicyDuration(i:Insurance){
 
    let s_d = i.start_date;
      let d = s_d.slice(0,4);
      let d_n = Number(d);
      //console.log(s_d+" "+ d+ " "+ d_n)

      d_n += i.duration;
      d = String(d_n);
      s_d = s_d.replace(s_d.slice(0,4),d);

      //console.log(s_d+" "+ d+ " "+ d_n)

      this.start_date = new Date(s_d);
      let time = this.start_date.getTime() - this.claim_date.getTime();
      if(time<0){
        return true;
      }

      return false;
  }

}
