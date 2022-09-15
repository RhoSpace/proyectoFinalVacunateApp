import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/vaccinatorView/main/main.component';
import { HomeComponent } from './components/adminView/home/home.component';
import { NavbarComponent } from './components/adminView/navbar/navbar.component';
import { UsersComponent } from './components/adminView/users/users.component';
import { NewUserComponent } from './components/adminView/users/new-user/new-user.component';
import { EditUserComponent } from './components/adminView/users/edit-user/edit-user.component';
import { PatientsComponent } from './components/adminView/patients/patients.component';
import { EditPatientComponent } from './components/adminView/patients/edit-patient/edit-patient.component';
import { VaccineComponent } from './components/adminView/vaccine/vaccine.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'vacunadorView', component: MainComponent },
  { path: 'home', component: NavbarComponent },
  { path: 'listUsers', component: UsersComponent },
  { path: 'newUser', component: NewUserComponent },
  { path: 'editUser/:id', component: EditUserComponent },
  { path: 'listPatients', component: PatientsComponent },
  { path: 'editPatient/:id', component: EditPatientComponent },
  { path: 'vaccine', component: VaccineComponent },
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
