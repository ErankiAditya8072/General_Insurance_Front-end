import { formatDate } from '@angular/common';
import { Component, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Insurance } from 'Insurance';
import { LocalStorageService } from 'ngx-webstorage';
import { ClaimService } from '../claim.service';
import { InnsuranceService } from '../innsurance.service';

@Component({
  selector: 'app-renew',
  templateUrl: './renew.component.html',
  styleUrls: ['./renew.component.css']
})
export class RenewComponent implements OnInit {

  validateRenew: FormGroup;
  submitted: boolean = false;
  start_date: Date = new Date();

  @Input() policy: Insurance;
  date1: Date;
  dur: number;
  result: any;
  ins: Insurance = new Insurance();
  getPremium: boolean = false;
  duration: number;

  constructor(private insServ: InnsuranceService, private formBuilder: FormBuilder, private claimServ : ClaimService, 
    public storage : LocalStorageService, public router: Router, @Inject(LOCALE_ID) public locale: string,private modalService: NgbModal) { }

  ngOnInit(): void {
    if (!this.storage.retrieve('isLoggedIn')) {
      alert("Please login to continue")
      this.router.navigate(["/"]);
    }

    this.validateRenew = this.formBuilder.group({
      duration: ['',Validators.required]
    })
    
    
  }
  

  onSubmit(){
    this.submitted = true;
    //console.log(this.validateClaim)
    
    if(this.validateRenew.invalid){
      return;
    }
    else{
      this.getPremium = true;
      this.submitted = false;
      this.duration = Number(this.validateRenew.controls['duration'].value)
      this.result = this.premiumCalculator(this.policy.vehicleIns.purchase_price, this.policy.vehicleIns.purchase_date,
        this.validateRenew.controls['duration'].value);
    }
  }

  makePayment(p: number){
    alert(`Payment of Rs. ${p} is done!`)
    this.setInsurance();
  }

  premiumCalculator(price: number, d: Date, years: number) {
    this.date1 = new Date(d);
    this.dur = this.start_date.getTime() - this.date1.getTime();
    console.log(this.dur);
    this.dur = (this.dur / (1000 * 3600 * 24)) / 365;
    console.log(this.dur)


    if (this.dur >= 0.5 && this.dur <= 1) {
      price = price - price * 5 / 100;
    }
    else if (this.dur > 1 && this.dur <= 2) {
      price = price - price * 15 / 100;
    }
    else if (this.dur > 2 && this.dur <= 3) {
      price = price - price * 20 / 100;
    }
    else if (this.dur > 3 && this.dur <= 4) {
      price = price - price * 30 / 100;
    }
    else if (this.dur > 4 && this.dur <= 5) {
      price = price - price * 40 / 100;
    }
    else if (this.dur > 5) {
      price = price - price * 50 / 100;
    }

    let premium = (price / 100) - 100;
    if (years == 1) {
    }
    else if (years == 2) {
      price = price + (price - price * 15 / 100);
      premium = premium - premium * 5 / 100;
    }
    else if (years = 3) {
      let p = price - price * 15 / 100,
        p1 = premium - premium * 5 / 100;
      price = price + p + (p - p * 15 / 100);
      premium = p1 - p1 * 5 / 100;
    }

    return [Math.floor(premium), Math.ceil(price)];
  }



  setInsurance(){
 
    this.ins.premium_amount = this.result[0];
    this.ins.insurance_value = this.result[1];

    this.ins.duration = Number(this.validateRenew.controls['duration'].value);

    this.ins.start_date = formatDate(this.start_date, "yyyy-MM-dd", this.locale);
    this.ins.policy_no = this.policy.policy_no;
    console.log(this.ins);
    this.insServ.renewInsurance(this.ins).subscribe(data => {
      if(data)
      {
        alert("successfully renewed");
        this.validateRenew.reset();
        this.modalService.dismissAll();
      }
   
    });


    
    //this.insServ.updateIns(this.ins).subscribe();
    
  }
}
