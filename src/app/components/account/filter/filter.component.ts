import { Component, OnInit, Input } from '@angular/core';
import { AccountService } from '../../../../services/account.service'

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Input()
  data: string;


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

  selectedGender
  dataGender: Array<Object> = ["All", "M", "F"];

  auth = JSON.parse(window.localStorage.getItem('auth')) || ''
  checkRole = this.auth.role

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.selectedGender = "All"
    console.log('role', JSON.parse(window.localStorage.getItem('auth')))
    console.log('filter data', this.data);
  }
  filterAccount() {
    console.log('search')
    const account = {
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
      state: this.state
    }

    for (let item in account) {
      if (item === 'gender' && account[item] === 'All') {
        delete account[item];
      }
      if (item !== 'age' && item !== 'account_number' && item !== 'balance') {
        if (account[item]) {
          account[item] = { '$regex': account[item], '$options': 'i' };
        }
        else {
          delete account[item];
        }
      }
      account[item] ? account[item] : delete account[item];
    }

    const params = {
      ...account,
      // page_size: 10,
      // page_index: 0,
      // order_by: 'account_number',
      // order_direction: -1
    }
    console.log('params', account)
    this.accountService.searchAccounts(params).subscribe((data: any) => {
      console.log('123-------', data.total)
      console.log('data', data)
    })
  }
}
