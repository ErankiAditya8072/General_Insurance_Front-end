import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Claim } from 'Claim';
import { Insurance } from 'Insurance';
import { InsuranceClaim } from 'InsuranceClaim';
import { LocalStorageService } from 'ngx-webstorage';
import { User } from 'User';
import { AdminService } from '../admin.service';
import { ClaimService } from '../claim.service';
import { InnsuranceService } from '../innsurance.service';

@Component({
  selector: 'app-admin-claim',
  templateUrl: './admin-claim.component.html',
  styleUrls: ['./admin-claim.component.scss']
})
export class AdminClaimComponent implements OnInit {

  insurance_pending: Insurance[] = [];
  insurance_approved: Insurance[]= [];
  insurance_rejected: Insurance[] = [];
  insurance: Insurance[];
  start_date : Date;
  claim_date: Date;
  d1: Date;
  dur: number;
  sideBarOpen: boolean = true;

  claim : Claim = new Claim();

  user:User[];
  allpending:InsuranceClaim[] = []
  allapproved:InsuranceClaim[] = [];
  allrejected:InsuranceClaim[] = [];



  constructor(private router: Router, public storage : LocalStorageService, private insServ : InnsuranceService, private claimServ
    :ClaimService,private adminServ:AdminService) { }

  ngOnInit(): void {
    if(!this.storage.retrieve("isAdminLoggedIn")){
      alert("Please Log-In to continue");
      this.router.navigate(["/admin"]);
    }
    console.log(this.insurance_pending);
    this.getInsuranceList();
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   console.log(changes)
  //   {
  //     this.insurance_pending,this.insurance_approved,this.insurance_rejected
  //   }
  // }
  
  

  getInsuranceList(){
    this.adminServ.getAllUsers().subscribe(data =>{
      this.user = data;
      this.user.forEach(e => {
        console.log(data);

        e.insurance.forEach( el=>{
          el.claimIns.forEach( c => {

            let ins = {name:e.name, policy_no:el.policy_no, reason:c.reason ,contact:e.contact,
                       cid:c.claim_id ,tca:el.total_claimed_amount ,pp:el.vehicleIns.purchase_price , pd:el.vehicleIns.purchase_date,
                       sd:el.start_date , cd:c.claim_date ,amount:c.amount};
             
            if(c.claim_status == 'pending')
                 this.allpending.push(ins);
            else if(c.claim_status == 'approved')
                  this.allapproved.push(ins);
            else this.allrejected.push(ins);
          })
        })
        
      })
     
     
    })
  }

 


  
  Pending(status:string):boolean{
    console.log(status);
    if(status == 'pending')
      return false;
    return true;
  }

  Approved(status:string):boolean{
    console.log(status);
    if(status == 'approved')
      return false;

    return true;
  }

  Rejected(status:string):boolean{
    if(status == 'rejected')
    {
      return false;
    }
    return true;
  }

  onApprove( tca: number, reason: string, cid: number, pp: number, pd:Date, sd: string, cd:string){
    this.d1 = new Date(pd);
    this.start_date = new Date(sd);
    this.claim_date = new Date(cd);
    this.dur = this.start_date.getTime() - this.d1.getTime();
    //console.log(this.dur);
    this.dur = (this.dur / (1000 * 3600 * 24)) / 365;
    //console.log(this.dur)


    if (this.dur >= 0.5 && this.dur <= 1) {
      pp = pp - pp * 5 / 100;
    }
    else if (this.dur > 1 && this.dur <= 2) {
      pp = pp - pp * 15 / 100;
    }
    else if (this.dur > 2 && this.dur <= 3) {
      pp = pp - pp * 20 / 100;
    }
    else if (this.dur > 3 && this.dur <= 4) {
      pp = pp - pp * 30 / 100;
    }
    else if (this.dur > 4 && this.dur <= 5) {
      pp = pp - pp * 40 / 100;
    }
    else if (this.dur > 5) {
      pp = pp - pp * 50 / 100;
    }

    let y = this.claim_date.getTime() - this.start_date.getTime();
    y = (y/1000*3600*24)/365;

    if(y>=0 && y<=1 ){}
    else if(y>1 && y<=2){
      pp = pp - 15*pp/100;
    }
    else if(y>2&& y<=3){
      let p1 = pp - 15*pp/100;
      pp = p1 - 15*p1/100;
    }



    let amount = 0;
    if(reason == 'accident'){
      amount = pp*75/100;
    }
    else if(reason == 'theft'){
      amount = pp*50/100;
    }
    else if(reason == 'natural'){
      amount = pp*80/100;
    }
    else if(reason == 'manmade'){
      amount = pp*65/100;
    }

    tca+=amount;

    this.claim.claim_id = cid;
    this.claim.amount = amount;
    this.claim.claim_status = 'approved';

    this.adminServ.updateClaimbyId(this.claim).subscribe(data => {
      console.log(data);
      // this.router.navigate([this.router.url])
      window.location.reload();
      
    });
  }

  onReject(cid: number){
    this.claim.amount = 0;
    this.claim.claim_status= "rejected";
    this.claim.claim_id = cid;

    this.adminServ.updateClaimbyId(this.claim).subscribe(data => {
      console.log(data);
      window.location.reload();
    });
  }
  

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
