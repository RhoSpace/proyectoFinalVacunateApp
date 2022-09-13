import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/loginService/auth.service';

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

	public rutLogin = new FormControl('');
	public passwordLogin = new FormControl('', [Validators.required]);

	constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

	ngOnInit() {
		this.isLoggedin = this.authService.isUserLoggedin();

		if (this.isLoggedin) {
			this.router.navigateByUrl('/vacunadorView');
		}
	}

	doLogin() {
		if (this.username !== '' && this.username !== null && this.password !== '' && this.password !== null) {
			this.authService.authenticate(this.username, this.password).subscribe((result) => {
				this.router.navigate(['/vacunadorView']);

			}, () => {
				this.error = 'Problemas con la conexión';
			});
		} else {
			this.error = 'Datos incorrectos';
		}
	}

}
