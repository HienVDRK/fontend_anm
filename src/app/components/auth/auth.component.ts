import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  email
  password

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
  }
  onClickLogin(){
    // this.authService.getuser().subscribe(respone => {
    //   console.log('respone', respone)
    // })
  }
}
