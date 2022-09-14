import { Component, OnInit } from '@angular/core';
import{ UserService } from '../../../services/usersService/user.service'
import { ActivatedRoute, Router } from '@angular/router'
import { User } from '../../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/loginService/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  public isLoggedin: boolean = false;
  public loggedinUser: string = '';

  constructor(
    private api: UserService, 
    private route: ActivatedRoute, private router: Router, 
    private http: HttpClient, private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.isLoggedin = this.authService.isUserLoggedin();
    this.loggedinUser = this.authService.getLoggedinUser();

    if (!this.isLoggedin) {
      this.router.navigateByUrl('login');
    }

    this.api.getAllUsers().subscribe(data => {
      console.log(data);
      this.users = data;
    })
  }

  userEdit(id: number) {
    this.router.navigate(['editarusuario', id]);
  }

  newUser() {
    this.router.navigate(['nuevousuario'])
  }
}
