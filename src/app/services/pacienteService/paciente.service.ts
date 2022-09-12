import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paciente } from '../../models/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private urlMicroServicioPaciente = 'http://localhost:8080/api/pacientes';

  constructor(
    private httpClient: HttpClient
  ) { }

  registrarPaciente(paciente: Paciente): Observable<Object>{ 
    return this.httpClient.post(`${this.urlMicroServicioPaciente}`, paciente);
  }

}
