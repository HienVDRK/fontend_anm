import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Input()
  data: string;

  constructor() { }

  ngOnInit() {
    console.log('filter data', this.data);
  }

}
