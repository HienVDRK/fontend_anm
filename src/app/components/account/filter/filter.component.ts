import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Input()
  data: string;

  auth = window.localStorage.getItem('auth')
  checkRole = JSON.parse(this.auth).role
  
  constructor() { }

  ngOnInit() {
    console.log('role', window.localStorage.getItem('auth'))
    console.log('filter data', this.data);
  }
  filterAccount(){
    
  }
}
