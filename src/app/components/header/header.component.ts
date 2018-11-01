import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  day = null;
  localTime = null;
  constructor() { }

  ngOnInit() {
    //get and formet date;
    this.day = moment().format('dddd'); 
    this.localTime = moment().format('MMMM Do YYYY');   
  }

}
