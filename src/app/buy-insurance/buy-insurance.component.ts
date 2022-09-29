import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vehicle } from 'Vehicle';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { VehicleService } from '../vehicle.service';
import { Insurance } from 'Insurance';
import { InnsuranceService } from '../innsurance.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-buy-insurance',
  templateUrl: './buy-insurance.component.html',
  styleUrls: ['./buy-insurance.component.css']
})
export class BuyInsuranceComponent implements OnInit {

  addVehicle: FormGroup;
  submitted: boolean = false;
  added: boolean = false;
  title: string;
  duration: number;
  start_date = new Date();
  vehicle: Vehicle = new Vehicle();
  insurance: Insurance = new Insurance();
  result: any;
  getPremium: boolean = false;

  dur: number;
  date1: Date;

  constructor(private formBuilder: FormBuilder, public storage: LocalStorageService, private router: Router,
    private vehServ: VehicleService, private insServ: InnsuranceService, @Inject(LOCALE_ID) public locale: string) { }

  ngOnInit(): void {
    if (!this.storage.retrieve('isLoggedIn')) {
      alert("Please login to continue")
      this.router.navigate(["/"]);
    }
    this.title = history.state.type;
    this.duration = history.state.duration;

    this.addVehicle = this.formBuilder.group({
      reg_no: ['', Validators.required],
      model: ['', Validators.required],
      manf: ['', Validators.required],
      ch_no: ['', Validators.required],
      eng_no: ['', Validators.required],
      li_no: ['', Validators.required],
      pur_date: ['', Validators.required],
      pur_price: ['', [Validators.required, Validators.min(50000)]]
    })
  }

  onBuy() {
    this.submitted = true;//on get Premium
    console.log(this.addVehicle)
    if (this.addVehicle.invalid) {
      return;
    } else {
      this.result = this.premiumCalculator(this.addVehicle.controls['pur_price'].value, this.addVehicle.controls['pur_date'].value, this.duration);
      this.getPremium = true;
      this.submitted = false;
      //this.addVeh();
    }
  }

  makePayment(p: number){
    alert(`Payment of Rs. ${p} is done!`)
    this.addVeh();
  }

  addVeh() {
    // this.vehServ.createVehicle(this.vehicle).subscribe(data => {
    //   console.log(data);
    // });
    //this.addVehicle.reset();
    this.addIns();
  }

  addIns() {
    this.insurance.duration = this.duration;
    this.insurance.start_date = formatDate(this.start_date, "yyyy-MM-dd", this.locale);
    this.insurance.premium_amount = this.result[0]*this.duration;
    // this.insurance.user = this.storage.retrieve("email");
    this.insurance.insurance_value = this.result[1];
    this.insurance.vehicleIns = this.vehicle;

    console.log(this.insurance);
    this.insServ.createIns(this.insurance).subscribe(data => {
        if(data)
        {
              console.log(data);
           this.addVehicle.reset();
          
           this.router.navigate(["/insurance"]);
        }else{
             alert("Internal Server Error");  
        }
      });

  }

  //premium calculation
  premiumCalculator(price: number, d: Date, years: number) {
    this.date1 = new Date(d);
    this.dur = this.start_date.getTime() - this.date1.getTime();
    //console.log(this.dur);
    this.dur = (this.dur / (1000 * 3600 * 24)) / 365;
    //console.log(this.dur)


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


}
