import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Claim } from 'Claim';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  
  private baseUrl = "http://localhost:8088/InsuranceApp/insurance/claim";

  constructor(private http_ser: HttpClient) { }

  createClaim(claim: Claim,pno:number): Observable<Claim[]>{
    return this.http_ser.post<Claim[]>(this.baseUrl+'/'+pno,claim);
  }

  // getAllClaim(): Observable<Claim[]>{
  //   return this.http_ser.get<Claim[]>(this.baseUrl);
  // }

 
}
