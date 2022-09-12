import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/loginService/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isLoggedin: boolean = false;
  public loggedinUser: string = '';
  public greeting: {} = {};

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
