import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/loginService/auth.service';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/usersService/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../../services/patientService/patient.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public paciente: User = new User();
  public totalPatients: number = 0;
  public totalVaccinator: number = 0;

  //Datos para el login
  public isLoggedin: boolean = false;
  public loggedinUser: string = '';
  public loggedinUserName: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService,
    private patientService: PatientService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.isLoggedin = this.authService.isUserLoggedin();
    this.loggedinUser = this.authService.getLoggedinUser();

    if (!this.isLoggedin) {
      this.router.navigateByUrl('login');
    }

    this.patientService.getAllPatient().subscribe(dato =>(
      this.totalPatients = dato.length
    ) );
    this.userService.getAllUsers().subscribe(dato =>(
      this.totalVaccinator = dato.length
    ));
  }

  refresh(): void { window.location.reload(); }

  doLogout() {
    this.authService.logout();
    this.router.navigateByUrl('login');
  }

}
