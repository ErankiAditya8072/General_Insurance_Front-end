import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-premium',
  templateUrl: './premium.component.html',
  styleUrls: ['./premium.component.css']
})
export class PremiumComponent implements OnInit {

  p_cal :FormGroup;
  submitted: boolean = false;
  getPremium: boolean;
  result: any;
  date1: Date;
  dur: number;
  start_date: Date= new Date();
  duration:number;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.p_cal = this.formBuilder.group({
      duration:['',Validators.required],
      pur_price:['',[Validators.required, Validators.min(50000)]],
      pur_date:['',Validators.required]
    })

    
  }

  onSubmit(){
    this.submitted = true;
    //console.log(this.validateClaim)
    
    if(this.p_cal.invalid){
      return;
    }
    else{
      this.getPremium = true;
      this.submitted = false;
      this.duration = Number(this.p_cal.controls['duration'].value)
      this.result = this.premiumCalculator(this.p_cal.controls['pur_price'].value, this.p_cal.controls['pur_date'].value,
       this.duration);
    }
  }

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
