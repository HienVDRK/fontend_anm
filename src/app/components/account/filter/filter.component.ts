import { Component, OnInit, Input } from '@angular/core';
import { AccountService } from '../../../../services/account.service'
import { Account } from 'src/app/model/account'
import { Account2 } from 'src/app/model/account2'

declare var jQuery: any;

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Input()
  data1: string;

  accounts: Array<any>

  account: Account = new Account()

  account2: Account2 = new Account2()

  selectedGender
  dataGenderAll: Array<Object> = ["All", "M", "F"];
  dataGender: Array<Object> = ["M", "F"];

  auth = JSON.parse(window.localStorage.getItem('auth')) || ''
  checkRole = this.auth.role

  colName

  pageSize = 20
  pageIndex = 0
  orderBy = "account_number"
  orderDirection = 1

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.account2.gender = "All"
    console.log('role', JSON.parse(window.localStorage.getItem('auth')))
    console.log('filter data', this.data1);

    this.colName = [
      'account_number',
      'balance',
      'firstname',
      'lastname',
      'age',
      'gender',
      'address',
      'employer',
      'email',
      'city',
      'state'
    ]

    this.searchAccount(null, this.pageSize, this.pageIndex, this.orderBy, this.orderDirection)
  }

  openModalAddAccount() {
    this.account = new Account()
    this.account.gender = "M"
    jQuery("#myModal").modal("show");
  }

  searchAccount(query, pageSize, pageIndex, orderBy, orderDirection) {
    this.accountService.searchAccounts(query, pageSize, pageIndex, orderBy, orderDirection).subscribe((respone: any) => {
      if (respone.success == 'true')
      this.accounts = respone.data
    })
  }


  filterAccount() {
    const params =
    {
      account_number: this.account2.account_number,
      balance: this.account2.balance,
      firstname: this.account2.firstname,
      lastname: this.account2.lastname,
      age: this.account2.age,
      gender: this.account2.gender,
      address: this.account2.address,
      employer: this.account2.employer,
      email: this.account2.email,
      city: this.account2.city,
      state: this.account2.state
    }

    for (let item in params) {
      if (item === 'gender' && params[item] === 'All') {
        delete params[item];
      }
      if (item !== 'age' && item !== 'account_number' && item !== 'balance') {
        if (params[item]) {
          params[item] = { '$regex': params[item], '$options': 'i' };
        }
        else {
          delete params[item];
        }
      }
      params[item] ? params[item] : delete params[item];
    }
    console.log(' params',  params)
    this.searchAccount(params, this.pageSize, this.pageIndex, this.orderBy, this.orderDirection)
  }

  deleteAccount(id) {
    if (this.checkRole == 'admin') {
      if (confirm("Are you sure to delete?")) {
        this.accountService.deleteAccount(id).subscribe((data: any) => {
          if (data.status == 200) {
            alert(data.message)
            this.searchAccount(null, this.pageSize, this.pageIndex, this.orderBy, this.orderDirection)
          }
        }, err => {
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

  sort(orderByCol) {
    if (this.orderDirection = -1)
      this.searchAccount(null, this.pageSize, this.pageIndex, orderByCol, this.orderDirection = -1)
    if (this.orderDirection = 1)
      this.searchAccount(null, this.pageSize, this.pageIndex, orderByCol, this.orderDirection = 1)
  }

  detailAccount(account){
    this.account = account;
  }

  createAccount() {
    if (this.checkRole == 'admin') {
      this.accountService.addAccount(this.account).subscribe((data: any) => {
        if (data.status == 200) {
          jQuery("#myModal").modal("hide");
          alert(data.message)
          this.searchAccount(null, this.pageSize, this.pageIndex, this.orderBy, this.orderDirection)
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


  clickOpenModalEdit(account) {
    this.account = account;
  }

  editAccount() {
    if (this.checkRole == 'admin') {
      this.accountService.updateAccount(this.account.account_number, this.account).subscribe((data: any) => {
        if (data.status == 200) {
          jQuery("#myModalEdit").modal("hide");
          alert(data.message)
          this.searchAccount(null, this.pageSize, this.pageIndex, this.orderBy, this.orderDirection)

        }
      }, err => {
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
}
