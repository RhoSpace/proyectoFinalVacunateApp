import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/loginService/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public isLoggedin: boolean = false;
  public loggedinUser: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private authService: AuthService) { }
  ngOnInit() {
    this.isLoggedin = this.authService.isUserLoggedin();
    this.loggedinUser = this.authService.getLoggedinUser();

    if (!this.isLoggedin) {
      this.router.navigateByUrl('login');
    }
  }

  doLogout() {
    this.authService.logout();
    this.router.navigateByUrl('login');
  }
}
