import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule, Validator } from '@angular/forms'
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { User } from '../../../../models/user.model';
import { UserService } from '../../../../services/usersService/user.service'
import { AuthService } from 'src/app/services/loginService/auth.service';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  public isLoggedin: boolean = false;
  public loggedinUser: string = '';

  newForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    rut: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private router: Router, private activatedroute: ActivatedRoute,
    private userService: UserService,
    private http: HttpClient, private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isLoggedin = this.authService.isUserLoggedin();
    this.loggedinUser = this.authService.getLoggedinUser();

    if (!this.isLoggedin) {
      this.router.navigateByUrl('login');
    }
  }

  postForm(form: User) { this.userService.postUser(form).subscribe(data => { this.backToList()}) }

  backToList() {
    this.router.navigate(['listUser'])
  }

}
