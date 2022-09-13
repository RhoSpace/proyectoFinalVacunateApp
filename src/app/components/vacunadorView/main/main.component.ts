import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/loginService/auth.service';
import { Paciente } from '../../../models/paciente';
import { PacienteService } from '../../../services/pacienteService/paciente.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {

  public paciente: Paciente = new Paciente();
  public vacuna: number = 100;
  public confirmMessage: boolean = false;
  public auxRutInvalid: string = '';

  //Datos para el login
  public isLoggedin: boolean = false;
	public loggedinUser: string = '';
	public greeting: {} = {};

  public rutCtrl = new FormControl('', [Validators.minLength(9), Validators.maxLength(9),Validators.required,
    Validators.pattern(/^(\d{8}[\dkK])$/gm)]);
  public nameCtrl = new FormControl('', [Validators.required]);
  public emailCtrl = new FormControl('', [Validators.required]);
  public phoneCtrl = new FormControl('', [Validators.required] );
  // public phoneCtrl = new FormControl('', [Validators.required, Validators.pattern("^(\d{8})$")] );

  constructor(
    private pacienteService: PacienteService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient, 
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isLoggedin = this.authService.isUserLoggedin();
		this.loggedinUser = this.authService.getLoggedinUser();

		if (!this.isLoggedin) {
			this.router.navigateByUrl('login');
		}
  }

  onSubmit() {
    this.paciente.vacunado = true;
    this.guardarPacientes();
  }

  guardarPacientes() {
    this.pacienteService.registrarPaciente(this.paciente).subscribe(
      dato => (this.confirmMessage = true),
      error => (console.log((this.auxRutInvalid = "repetido")+error))
      );
  }

  refresh(): void { window.location.reload(); }

  doLogout() {
    this.authService.logout();
    this.router.navigateByUrl('login');
  }

}
