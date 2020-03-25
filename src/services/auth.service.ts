import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private URL = 'http://localhost:5000/auth';

  private auth = JSON.parse(window.localStorage.getItem('auth')) || ''

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.auth.token}`
  })

  getUser() {
    return this.http.get<any[]>(`${this.URL}/users`, { headers: this.headers })

  }

  login(obj) {
    return this.http.post<any[]>(`${this.URL}/users_login`, obj, { headers: this.headers })
  }
}
