import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/vacunadorView/main/main.component';
import { HomeComponent } from './components/adminView/home/home.component';
import { NavbarComponent } from './components/adminView/navbar/navbar.component';
import { UsersComponent } from './components/adminView/users/users.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'vacunadorView', component: MainComponent },
  { path: 'home', component: NavbarComponent },
  { path: 'listUser', component: UsersComponent },
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
