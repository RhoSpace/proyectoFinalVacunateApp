import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/loginService/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule, Validator } from '@angular/forms'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Patient } from '../../../../models/patient.model';
import { PatientService } from '../../../../services/patientService/patient.service'

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss']
})
export class EditPatientComponent implements OnInit {

  public isLoggedin: boolean = false;
  public loggedinUser: string = '';
  public confirmMessage: boolean = false;

  constructor(
    private router: Router, private activatedroute: ActivatedRoute,
    private patientService: PatientService,
    private http: HttpClient, private authService: AuthService
  ) { }

  patientData: Patient[] = [];
  editForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    rut: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
  });

  ngOnInit(): void {

    let patid: string | null = this.activatedroute.snapshot.paramMap.get('id');
    console.log(patid);
    this.patientService.getUniquePatient(parseInt(patid!.toString())).subscribe(data => {
      console.log(data)
      this.editForm.setValue({
        id: data.id,
        name: data.name,
        rut: data.rut,
        phone: data.phone,
        email: data.email,
      });
    })

    this.isLoggedin = this.authService.isUserLoggedin();
    this.loggedinUser = this.authService.getLoggedinUser();

    if (!this.isLoggedin) {
      this.router.navigateByUrl('login');
    }
  }

  postForm(form: Patient) {
    this.patientService.updatePatient(form).subscribe(data => {
      this.backToList();
    })
  }

  deletePatient() {
    let dataPat: Patient  = this.editForm.value;
    this.patientService.deletePatient(dataPat).subscribe(data =>{
    })
    setTimeout(() => {
      this.backToList()
     }, 1500);
  }

  backToList() {
    this.router.navigate(['listPatients'])
  }

  refresh(): void { window.location.reload(); }
  
}
