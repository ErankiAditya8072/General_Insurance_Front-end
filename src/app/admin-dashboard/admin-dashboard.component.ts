import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Insurance } from 'Insurance';
import { InsuranceUser } from 'InsuranceUser';
import { LocalStorageService } from 'ngx-webstorage';
import { User } from 'User';
import { AdminService } from '../admin.service';
import { InnsuranceService } from '../innsurance.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  user:User[];
  insurance: Insurance[] = [];
  ia : Insurance[]= [];
  iia: Insurance[] = [];

  allinsurance:InsuranceUser[]=[];
  allactiveins:InsuranceUser[] = [];
  allinactiveins:InsuranceUser[] = [];
  
  start_date: Date = new Date();
  d1: Date;

  constructor(private router: Router, public storage : LocalStorageService, private insServ : InnsuranceService,private adminServ:AdminService) { }

  ngOnInit(): void {
    if(!this.storage.retrieve("isAdminLoggedIn")){
      alert("Please Log-In to continue");
      this.router.navigate(["/admin"]);
    }

    this.getInsuranceList();
  }
  
  getInsuranceList(){
    this.adminServ.getAllUsers().subscribe(data => 
      {
        console.log(data);
        this.user = data

        console.log(this.user);
        this.user.forEach(e=>{
          e.insurance.forEach(el =>{
            
              this.insurance.push(el);

              //new code (only taking the things that is to be displayed)
              let ins = {name:e.name, policy_no:el.policy_no, insurance_value:el.insurance_value, contact:e.contact};
              this.allinsurance.push(ins);

              if(!this.verifyPolicyDuration(el))
              {
                  this.allactiveins.push(ins);
              }
              else{
                this.allinactiveins.push(ins);
              }
              //new code end

          })
         
        })
      });
      console.log(this.allinsurance);
      console.log(this.allactiveins);
      console.log(this.allinactiveins);
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

      this.d1 = new Date(s_d);
      let time = this.d1.getTime() - this.start_date.getTime();
      if(time<0){
        return true;
      }

      return false;
  }

  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
