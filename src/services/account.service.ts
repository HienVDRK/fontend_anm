import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  private URL = 'http://localhost:5000/account';

  private auth = window.localStorage.getItem('auth');

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${JSON.parse(this.auth).token}`
  })

  getAccounts() {
    return this.http.get<any[]>(`${this.URL}/get_accounts`, { headers: this.headers })
  }

  getAccounts_byID(id) {
    return this.http.get<any[]>(`${this.URL}/get_accounts_by_id/${id}`, { headers: this.headers })
  }

  addAccount(obj) {
    return this.http.post<any[]>(`${this.URL}/add_account`, obj, { headers: this.headers })
  }

  updateAccount(id, obj) {
    return this.http.put<any[]>(`${this.URL}/update_account/${id}`, obj,{ headers: this.headers })
  }

  deleteAccount(id) {
    return this.http.delete<any[]>(`${this.URL}/delete_account/${id}`, { headers: this.headers })
  }
}
