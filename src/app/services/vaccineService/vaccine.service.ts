import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vaccine } from 'src/app/models/vaccine.model';

@Injectable({
  providedIn: 'root'
})
export class VaccineService {

  private urlVaccine= "http://localhost:8081/api/vaccine/"
  
  constructor(private httpClient: HttpClient) { }

  updateVaccine(id:number,vaccine:Vaccine) : Observable<Object>{
    return this.httpClient.put(`${this.urlVaccine}/${id}`,vaccine);
  }

  findVaccineById(id:number):Observable<Vaccine>{
    return this.httpClient.get<Vaccine>(`${this.urlVaccine}/${id}`);
  }


}
