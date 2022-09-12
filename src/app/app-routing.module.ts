import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/vacunadorView/main/main.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path: '', redirectTo: 'vacunadorView', pathMatch: 'full'},
  {path: 'vacunadorView', component: MainComponent},
  {path: 'login', component: LoginComponent}
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
