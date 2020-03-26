import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  private URL = 'http://localhost:5000/account';

  private auth = JSON.parse(window.localStorage.getItem('auth')) || '';

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.auth.token} `
  })

  searchAccounts(query: any, pageSize, pageIndex, orderBy, orderDirection) {
    let params = {
      'query': JSON.stringify(query),
      'page_size': pageSize,
      'page_index': pageIndex,
      'order_by': orderBy,
      'order_direction': orderDirection
    }
    return this.http.get<any[]>(`${this.URL}/accounts1`, { params, headers: this.headers })
  }

  getAccounts() {
    return this.http.get<any[]>(`${this.URL}/accounts`, { headers: this.headers })
  }

  getAccounts_byID(id) {
    return this.http.get<any[]>(`${this.URL}/accounts/${id}`, { headers: this.headers })
  }

  addAccount(obj) {
    return this.http.post<any[]>(`${this.URL}/accounts`, obj, { headers: this.headers })
  }

  updateAccount(id, obj) {
    return this.http.put<any[]>(`${this.URL}/accounts/${id}`, obj, { headers: this.headers })
  }

  deleteAccount(id) {
    return this.http.delete<any[]>(`${this.URL}/accounts/${id}`, { headers: this.headers })
  }
}
