import { Component, OnInit } from '@angular/core';
import { BialysisService } from './bialysis.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title;
  constructor(private bialysis: BialysisService) {
    this.title = 'waiting';
  }
  ngOnInit() {
    this.bialysis.bialysis('poptart', 'washingtonpost.com').then((response) => {
      console.log(response);
      this.title = response;
    }).catch((err) => { console.log(err) });
    // this.bialysis.test().then((response) => {
    //   console.log(response);
    // });
  }
}