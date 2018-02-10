import { Component, OnInit } from '@angular/core';
import { BialysisService } from './bialysis.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  search;
  sources;
  newsource;

  constructor(private bialysis: BialysisService) {
    this.search = null;
    this.sources = {};
    this.newsource = "";
  }
  // ngOnInit() {
  //   this.bialysis.bialysis('poptart', 'washingtonpost.com').then((response) => {
  //     console.log(response);
  //     this.title = response;
  //   }).catch((err) => { console.log(err) });
  //   this.bialysis.test().then((response) => {
  //     console.log(response);
  //   });
  // }
  addSource(source) {
    this.sources[source] = {};
    //this.sources.length = this.sources.length + 1;
    console.log(this);
    console.log(this.sources);
    console.log(this.sources.length);
  }
  removeSource(source) {
    delete this.sources[source];
  }
  updateResults(source, results) {
    this.sources[source].results = results;
  }
  analyze(source) {
    this.bialysis.bialysis(this.search, source).then((response) => {
      console.log(response);
      this.updateResults(source, response);
    }).catch((err) => { console.log(err) });
     this.bialysis.test().then((response) => {
       console.log(response);
     });
  }
  analyzeAll() {
    for(var source in this.sources) {
      this.analyze(source);
    }
  }
}