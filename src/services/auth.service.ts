import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getuser() {
    //  return this.http.get()
  }

  login(email, password) {
    return this.http.post(`/auth/users_login`, email, password);
  }
}
