import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent implements OnInit {

  plans: any[] = [
    { duration: 1 },
    { duration: 2 },
    { duration: 3 }
  ] 
  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }

  open( type: string, duration: number){
    this.router.navigate(["/buy"], {state: {type:type, duration:duration }})
  }

}
