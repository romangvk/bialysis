import { Component, OnInit } from '@angular/core';
import { BialysisService } from './bialysis.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  search;
  sources;
  newsource;
  loading;

  constructor(private bialysis: BialysisService) {
    this.search = null;
    this.sources = {};
    this.newsource = "";
    this.loading = false;
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
  click(source) {
    this.addSource(source);
    this.newsource = "";
  }
  objectkeys(object) {
    return Object.keys(object);
  }
  reload() {
    window.location.reload();
  }
  addSource(source) {
    this.sources[source] = {};
    //this.sources.length = this.sources.length + 1;
    console.log(this);
    console.log(this.sources);
    console.log(Object.keys(this.sources).length);
  }
  removeSource(source) {
    delete this.sources[source];
  }
  updateResults(source, results) {
    console.log(results);
    var avg = 0;
    var numresults = results.length;
    for (var result in results) {
      //this.sources[source].results.push({ score:results[result].documentSentiment.score, magnitude:results[result].documentSentiment.magnitude});
      avg += results[result].documentSentiment.score;
    }
    avg /= numresults;
    this.sources[source].results = avg*20;
  }
  analyze(source) {
    this.loading = true;
    if (this.bialysis.hasarticles(this.search, source)) {
      console.log("testing local db");
      this.bialysis.test(this.search, source).then((response) => {
        console.log(response);
        this.loading = false;
        this.updateResults(source, response);
      });
    } else {
      console.log("scraping google");
      this.bialysis.bialysis(this.search, source).then((response) => {
        console.log(response);
        this.loading = false;
        this.updateResults(source, response);
      }).catch((err) => { console.log(err) });
    }
  }
  analyzeAll() {
    for (var source in this.sources) {
      this.analyze(source);
    }
  }
}