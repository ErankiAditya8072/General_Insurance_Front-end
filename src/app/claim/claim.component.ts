import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Claim } from 'Claim';
import { Insurance } from 'Insurance';
import { LocalStorageService } from 'ngx-webstorage';

import { ClaimService } from '../claim.service';
import { InnsuranceService } from '../innsurance.service';


@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})
export class ClaimComponent implements OnInit {

  claim: Claim = new Claim();
  submitted : boolean = false;
  validateClaim: FormGroup;

  claim_date : Date = new Date();
  start_date: Date = new Date();


  @Input() policy: Insurance;



  constructor(private insServ: InnsuranceService, private formBuilder: FormBuilder, private claimServ : ClaimService, 
    public storage : LocalStorageService, public router: Router, @Inject(LOCALE_ID) public locale: string,private modalService:NgbModal) { }

  ngOnInit(): void {
    if (!this.storage.retrieve('isLoggedIn')) {
      alert("Please login to continue")
      this.router.navigate(["/"]);
    }

    this.validateClaim = this.formBuilder.group({
      reason: ['',Validators.required]
    })

    
  }
  

  onSubmit(){
    this.submitted = true;
    //console.log(this.validateClaim)
    
    if(this.validateClaim.invalid){
      return;
    }
    else{
      
      this.setClaim();
      // this.setInsurance();
    }
  }

  setClaim(){
    this.claim.claim_date = formatDate(this.claim_date, "yyyy-MM-dd", this.locale);
    // this.claim.claim_id = 1001;
    // this.claim.claim_status = "pending";
    // this.claim.amount = 0;
    console.log(this.policy.policy_no);
    console.log(this.claim);
    this.claimServ.createClaim(this.claim,this.policy.policy_no).subscribe(data => 
       {
        console.log(data);
              if(data)
              {
                alert("account claim is pending");
                this.modalService.dismissAll();
              }
            
             
       }
      
    );
  }

  // setInsurance(){
  //   this.policy.claimIns.amount = 0;
  //   this.policy.claimIns.claim_status = "pending";
  //   this.policy.claimIns.reason = this.validateClaim.controls['reason'].value;
  //   this.policy.claimIns.claim_date = formatDate(this.claim_date, "yyyy-MM-dd", this.locale);
  //   this.policy.claimIns.claim_id = 1001;
  //   //this.insServ.updateIns(this.policy.policy_no).subscribe();
  // }


  

}
