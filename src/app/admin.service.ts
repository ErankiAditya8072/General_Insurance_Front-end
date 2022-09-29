import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from 'Admin';
import { Claim } from 'Claim';
import { Insurance } from 'Insurance';
import { Observable } from 'rxjs';
import { User } from 'User';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = "http://localhost:8088/InsuranceApp/admin";
  constructor(private http_ser: HttpClient) { }

  getAdminbyId(admin:Admin): Observable<Admin>{
    return this.http_ser.post<Admin>(this.baseUrl+'/login',admin);
  }

  getAllUsers():Observable<User[]> {
    return this.http_ser.get<User[]>(this.baseUrl+'/users');
  }

  getAllInsurances():Observable<Insurance[]>{
    return this.http_ser.get<Insurance[]>(this.baseUrl+'/insurances');
  }

  updateClaimbyId(claim: Claim): Observable<Insurance>{
    return this.http_ser.post<Insurance>(this.baseUrl+'/claim',claim);
  }
}
