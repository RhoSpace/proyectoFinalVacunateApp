import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule, Validator } from '@angular/forms'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { User } from '../../../../models/user.model';
import { UserService } from '../../../../services/usersService/user.service'
import { AuthService } from 'src/app/services/loginService/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  public isLoggedin: boolean = false;
  public loggedinUser: string = '';
  public confirmMessage: boolean = false;

  constructor(
    private router: Router, private activatedroute: ActivatedRoute,
    private userService: UserService,
    private http: HttpClient, private authService: AuthService
  ) { }

  userData: User[] = [];
  editForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    rut: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl(false)
  });

  ngOnInit(): void {

    let userid: string | null = this.activatedroute.snapshot.paramMap.get('id');
    this.userService.getUniqueUser(parseInt(userid!.toString())).subscribe(data => {
      console.log(data)
      this.editForm.setValue({
        id: data.id,
        name: data.name,
        rut: data.rut,
        phone: data.phone,
        email: data.email,
        password: data.password,
        role: data.role
      });
    })

    this.isLoggedin = this.authService.isUserLoggedin();
    this.loggedinUser = this.authService.getLoggedinUser();

    if (!this.isLoggedin) {
      this.router.navigateByUrl('login');
    }
  }

  postForm(form: User) {
    this.userService.putUser(form).subscribe(data => {
      this.backToList();
    })
  }

  deleteUser() {
    let userData: User = this.editForm.value;
    this.userService.deleteUser(userData).subscribe(data => {})
    setTimeout(() => {
      this.backToList()
    }, 1500);
  }

  backToList() {
    this.router.navigate(['listUsers'])
  }

  refresh(): void { window.location.reload(); }

}
