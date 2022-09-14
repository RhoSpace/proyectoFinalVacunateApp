import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/loginService/auth.service';
import { UserService } from '../../services/usersService/user.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

	public username: string = '';
	public password: string = '';
	public isLoggedin: boolean = false;
	public error: string = '';
	public role: number = 0;

	public rutLogin = new FormControl('', [Validators.minLength(9), Validators.maxLength(9), Validators.required,
	Validators.pattern(/^(\d{8}[\dkK])$/gm)]);
	public passwordLogin = new FormControl('', [Validators.required]);

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private authService: AuthService,
		private userService: UserService,
	) { }

	ngOnInit(): void {
		this.isLoggedin = this.authService.isUserLoggedin();
		if (this.isLoggedin) {
			if (this.role === 1) {
				this.router.navigateByUrl('/home');
			} else if (this.role === 2) {
				this.router.navigateByUrl('/vacunadorView');
			} else {
				this.isLoggedin = false;
				this.role = 0;
				this.authService.logout() 
			}
		}
	}

	doLogin(): void {
		if (this.username !== '' && this.username !== null && this.password !== '' && this.password !== null) {
			this.authService.authenticate(this.username, this.password).subscribe((result) => {
				this.getRol();
			}, () => {
				this.error = 'Datos incorrectos/ problemas con la conexión';
			});
		} else {
			this.error = 'Datos incorrectos';
		}
	}

	getRol(): void {
		this.userService.getUserByRut(this.username).subscribe(
			data => (this.routeFromLogin(data.role, data.name))
		);
	}

	routeFromLogin(rol: boolean, name: string): void {
		if (rol) {
			this.role = 1
			this.router.navigate(['/home']);
		} else {
			this.role = 2
			this.router.navigate(['/vacunadorView']);
		}
	}

}
