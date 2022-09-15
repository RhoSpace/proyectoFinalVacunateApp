import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Vaccine } from 'src/app/models/vaccine.model';
import { AuthService } from 'src/app/services/loginService/auth.service';
import { VaccineService } from 'src/app/services/vaccineService/vaccine.service';

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.component.html',
  styleUrls: ['./vaccine.component.scss']
})
export class VaccineComponent implements OnInit {

  public vaccine: Vaccine = new Vaccine();
  public amount: number = 0;
  public confirmMessage: boolean = false;

  //Datos para el login
  public isLoggedin: boolean = false;
  public loggedinUser: string = '';

  public vaccineCtrl: FormControl = new FormControl('', [Validators.minLength(0), Validators.maxLength(5), Validators.required,
    Validators.required, Validators.pattern("^[1-9]$")]);

  constructor(
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

  updateVaccine() {
    this.vaccineService.updateVaccine(1, this.vaccine).subscribe(dato => {
      alert("Cantidad de vacunas actualizada")
      this.refresh();
    });
  }

  refresh(): void { window.location.reload(); }
}
