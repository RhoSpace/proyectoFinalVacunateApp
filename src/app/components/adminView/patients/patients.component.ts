import { Component, OnInit } from '@angular/core';
import{ PatientService } from '../../../services/patientService/patient.service'
import { ActivatedRoute, Router } from '@angular/router'
import { Patient } from '../../../models/patient.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/loginService/auth.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

  public patients: Patient[] = [];
  public isLoggedin: boolean = false;
  public loggedinUser: string = '';

  constructor(
    private patientService: PatientService, 
    private route: ActivatedRoute, private router: Router, 
    private http: HttpClient, private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.isLoggedin = this.authService.isUserLoggedin();
    this.loggedinUser = this.authService.getLoggedinUser();

    if (!this.isLoggedin) {
      this.router.navigateByUrl('login');
    }

    this.patientService.getAllPatient().subscribe(data => {
      this.patients = data;
    })
  }

  patientEdit(id: number) {
    this.router.navigate(['editPatient', id]);
  }
}