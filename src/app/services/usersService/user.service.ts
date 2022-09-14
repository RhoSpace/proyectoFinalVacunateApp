import { Injectable } from '@angular/core';
import { User } from '../../models/user.model'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: String = "https://microservice-vacunateapp-user.herokuapp.com/"

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    let direction = this.url + "api/users/list"
    return this.http.get<User[]>(direction);
  }

  getUserByRut(rut: string): Observable<User> {
    let direction = this.url + "api/users/find/rut/?rut=" + rut;
    return this.http.get<User>(direction);
  }

  getUniqueUser(id: number): Observable<User> {
    let direction = this.url + "api/users/find/id/?id=" + id;
    return this.http.get<User>(direction);
  }

  putUser(form: User): Observable<User> {
    let direction = this.url + "api/users/update?id=" + form.id;
    return this.http.put<User>(direction, form)
  }

  postUser(form: User): Observable<User> {
    let direction = this.url + "api/users/save";
    return this.http.post<User>(direction, form)
  }

}
