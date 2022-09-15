import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../../models/patient.model'

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private urlApi = 'http://localhost:7070/';

  constructor(
    private httpClient: HttpClient
  ) { }

  registerPatient(patient: Patient): Observable<Object> {
    let direction = this.urlApi + "api/patient";
    return this.httpClient.post(direction, patient);
  }

  getAllPatient(): Observable<Patient[]> {
    let direction = this.urlApi + "api/patient"
    return this.httpClient.get<Patient[]>(direction);
  }

  getUniquePatient(id: number): Observable<Patient> {
    let direction = this.urlApi + `api/patient/${id}`;
    return this.httpClient.get<Patient>(direction);
  }

  deletePatient(form: Patient): Observable<Patient> {
    let direction = this.urlApi + "api/patient/?id=" + form.id;
    let options= {
      headers:new HttpHeaders({
        "Content-Type": "application/json",
      }),
      body:form
    }
    return this.httpClient.delete<Patient>(direction, options);
  }

  updatePatient(form: Patient): Observable<Patient> {
    let direction = this.urlApi + `api/patient/${form.id}`;
    return this.httpClient.put<Patient>(direction, form)
  }

}
