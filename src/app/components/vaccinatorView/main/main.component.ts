import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Vaccine } from 'src/app/models/vaccine.model';
import { AuthService } from 'src/app/services/loginService/auth.service';
import { VaccineService } from 'src/app/services/vaccineService/vaccine.service';
import { Patient } from '../../../models/patient.model';
import { PatientService } from '../../../services/patientService/patient.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {

  public patient: Patient = new Patient();
  public vaccine: Vaccine = new Vaccine();
  public amount: number = 0;
  public confirmMessage: boolean = false;
  public auxRutInvalid: string = '';

  //Datos para el login
  public isLoggedin: boolean = false;
  public loggedinUser: string = '';

  public rutCtrl: FormControl = new FormControl('', [Validators.minLength(9), Validators.maxLength(9), Validators.required,
  Validators.pattern(/^(\d{8}[\dkK])$/gm)]);
  public nameCtrl: FormControl = new FormControl('', [Validators.required]);
  public emailCtrl: FormControl = new FormControl('', [Validators.required]);
  public phoneCtrl: FormControl = new FormControl('', [Validators.required]);
  // public phoneCtrl = new FormControl('', [Validators.required, Validators.pattern("^(\d{8})$")] );

  constructor(
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService,
    private vaccineService: VaccineService
  ) { }

  ngOnInit(): void {
    this.isLoggedin = this.authService.isUserLoggedin();
    this.loggedinUser = this.authService.getLoggedinUser();

    if (!this.isLoggedin) {
      this.router.navigateByUrl('login');
    }

    this.vaccineService.findVaccineById(1).subscribe(dato => {
      this.vaccine = dato;
      this.amount = this.vaccine.amount;
    });

  }

  onSubmit() {
    if (this.vaccine.amount > 0) {
      this.patient.vaccinated = true;
      this.savePatient();
    } else {
      alert("no quedan vacunas");
    }
  }

  updateVaccine() {
    this.vaccineService.updateVaccine(1, this.vaccine).subscribe(dato => {
      console.log("se agregó")
    });
  }

  findVaccine(){
    this.vaccineService.findVaccineById(1).subscribe(dato =>{
      this.vaccine = dato;
    },error => console.log(error));
  }

  savePatient() {
    this.patientService.registerPatient(this.patient).subscribe(
      dato => {
        this.confirmMessage = true;
        this.patient.vaccinated = true;
        this.vaccine.amount = -1;
        this.updateVaccine();
      },
      error => (console.log((this.auxRutInvalid = "repetido") + error))
    );
  }

  refresh(): void { window.location.reload(); }

  doLogout() {
    this.authService.logout();
    this.router.navigateByUrl('login');
  }

}
