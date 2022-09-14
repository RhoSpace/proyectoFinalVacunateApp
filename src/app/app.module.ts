import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { HttpInterceptorService } from './services/httpService/http-interceptor.service';
import { MainComponent } from './components/vacunadorView/main/main.component';
import { HomeComponent } from './components/adminView/home/home.component';
import { NavbarComponent } from './components/adminView/navbar/navbar.component';
import { UsersComponent } from './components/adminView/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,    
    MainComponent, HomeComponent, NavbarComponent, UsersComponent, 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
