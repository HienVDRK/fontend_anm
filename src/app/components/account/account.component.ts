import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { Router } from '@angular/router';
declare var jQuery: any;

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  id: ''
  account_number: ''
  balance: ''
  firstname: ''
  lastname: ''
  age: ''
  gender: ''
  address: ''
  employer: ''
  email: ''
  city: ''
  state: ''
  accounts: ''
  auth = window.localStorage.getItem('auth')
  checkRole = JSON.parse(this.auth).role
  selectedGender
  selectedGenderUpdate
  data:Array<Object> = ["M", "F"];

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }


  ngOnInit() {
    this.selectedGender = "M"
    this.getAll()
  }

  getAll() {
    this.accountService.getAccounts().subscribe((data: any) => {
      this.accounts = data
    })
  }

  createAccount() {
    let objAccount = {
      account_number: this.account_number,
      balance: this.balance,
      firstname: this.firstname,
      lastname: this.lastname,
      age: this.age,
      gender: this.selectedGender,
      address: this.address,
      employer: this.employer,
      email: this.email,
      city: this.city,
      state: this.state,
    }
    if (this.checkRole == 'admin') {
      this.accountService.addAccount(objAccount).subscribe((data: any) => {
        if (data.status == 200) {
          jQuery("#myModal").modal("hide");
          alert(data.message)
          this.getAll()
        }
      }, err => {
        console.log('err', err)
        if (err.status == 400) {
          alert(err.error.message)
        }
        if (err.status == 500) {
          alert(err.error.message)
        }
        if (err.status == 401) {
          alert(err.error.message)
        }
      })
    } else {
      alert("Not permission")
    }
  }

  deleteAccount(id) {
    if (this.checkRole == 'admin') {

      if (confirm("Are you sure to delete?")) {
        this.accountService.deleteAccount(id).subscribe((data: any) => {
          if (data.status == 200) {
            alert(data.message)
            this.getAll()
          }
        }, err => {
          console.log('err', err)
          if (err.status == 403) {
            alert(err.error.message)
          }
          if (err.status == 500) {
            alert(err.error.message)
          }
          if (err.status == 401) {
            alert(err.error.message)
          }
        })
      }

    }
    else {
      alert("Not permission")
    }
  }

  clickOpenModalEdit(id) {
    this.accountService.getAccounts_byID(id).subscribe((data: any) => {
      this.id = id
      this.account_number = data.account_number
      this.balance = data.balance
      this.firstname = data.firstname
      this.lastname = data.lastname
      this.age = data.age
      this.selectedGenderUpdate = data.gender
      this.address = data.address
      this.employer = data.employer
      this.email = data.email
      this.city = data.city
      this.state = data.state
    })
  }

  editAccount() {
    let objAccount = {
      account_number: this.account_number,
      balance: this.balance,
      firstname: this.firstname,
      lastname: this.lastname,
      age: this.age,
      gender: this.selectedGenderUpdate,
      address: this.address,
      employer: this.employer,
      email: this.email,
      city: this.city,
      state: this.state,
    }
    if (this.checkRole == 'admin') {
      this.accountService.updateAccount(this.id, objAccount).subscribe((data: any) => {
        if (data.status == 200) {
          jQuery("#myModalEdit").modal("hide");
          alert(data.message)
          this.getAll()
        }
      }, err => {
        console.log('err', err)
        if (err.status == 400) {
          alert(err.error.message)
        }
        if (err.status == 403) {
          alert(err.error.message)
        }
        if (err.status == 500) {
          alert(err.error.message)
        }
        if (err.status == 401) {
          alert(err.error.message)
        }
      })
    } else {
      alert("Not permission")
    }
  }

  detailAccount(id){
    this.accountService.getAccounts_byID(id).subscribe((data: any) => {
      this.id = id
      this.account_number = data.account_number
      this.balance = data.balance
      this.firstname = data.firstname
      this.lastname = data.lastname
      this.age = data.age
      this.selectedGenderUpdate = data.gender
      this.address = data.address
      this.employer = data.employer
      this.email = data.email
      this.city = data.city
      this.state = data.state
    })
  }
}
