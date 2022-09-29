import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Obj } from '@popperjs/core';
import { Insurance } from 'Insurance';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class InnsuranceService {
  private baseUrl = "http://localhost:8088/InsuranceApp/users";
  
  private renewUrl = "http://localhost:8088/InsuranceApp/insurance/renew";

  constructor(private http_ser: HttpClient,public storage:LocalStorageService) { }

  createIns(insurance: Insurance): Observable<Insurance>{
 
    return this.http_ser.post<Insurance>(this.baseUrl+'/'+this.storage.retrieve('email'),insurance);
  }

 
  getAllIns(): Observable<Insurance[]>{
    return this.http_ser.get<Insurance[]>(this.baseUrl);
  }

  getInsByNo(pno:number): Observable<Insurance[]>{
    return this.http_ser.get<Insurance[]>(this.baseUrl+'/?policy_no='+pno);
  }

  renewInsurance(ins:Insurance):Observable<Insurance>{
    return this.http_ser.post<Insurance>(this.renewUrl,ins);
  }
  //

  // getActiveIns(): Observable<Insurance[]>{
  //   return this.http_ser.get<Insurance[]>(this.baseUrl+'/'+)
  // }
}
