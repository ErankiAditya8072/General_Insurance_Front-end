import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehicle } from 'Vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private baseUrl = "http://localhost:3000/vehicle";
  constructor(private http_ser: HttpClient) { }

  createVehicle(vehicle: Vehicle): Observable<object>{
    return this.http_ser.post(this.baseUrl, vehicle);
  }
}
