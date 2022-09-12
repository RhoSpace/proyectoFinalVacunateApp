import { Component, OnInit } from '@angular/core';
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
				this.error = 'Either invalid credentials or something went wrong';
			});
		} else {
			this.error = 'Invalid Credentials';
		}
	}

}
