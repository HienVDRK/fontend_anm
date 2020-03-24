import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  email: '';
  password: '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log('tokenlc', window.localStorage.getItem('auth'))
  }

  onClickLogin() {
    if (this.email && this.password) {
      let obj = {
        email: this.email,
        password: this.password
      }
      console.log(obj)
      this.authService.login(obj).subscribe((respone: any) => {
        localStorage.setItem('auth', JSON.stringify({
          'token' : respone.token,
          'username': respone.username,
          'role': respone.role
        }));
        this.router.navigate(['/']);
      }, err => {
        if (err.status == 401) {
          alert(err.error.error)
          console.log(err.error.error)
        }
        if (err.status == 500) {
          alert('Something went wrong')
          console.log('Something went wrong')
        }
      })
    } else {
      alert('Please enter your email and password')
    }
  }
}
