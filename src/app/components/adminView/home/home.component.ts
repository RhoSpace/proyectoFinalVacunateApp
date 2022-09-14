import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/loginService/auth.service';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/usersService/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public paciente: User = new User();

  //Datos para el login
  public isLoggedin: boolean = false;
	public loggedinUser: string = '';
  public loggedinUserName: string = '';
	public greeting: {} = {};

  constructor(
    private userService: UserService,
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

  refresh(): void { window.location.reload(); }

  doLogout() {
    this.authService.logout();
    this.router.navigateByUrl('login');
  }

}
