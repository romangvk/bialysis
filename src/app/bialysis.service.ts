import { Injectable } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class BialysisService {
  data: {};
  loading: boolean;
  constructor(private http: HttpClient) {
    this.data = {
      articles: [],
      sentiments: []
    };
    this.loading = false;
  }
  getarticles(topic, source) {
    return new Promise((resolve, reject) => {
      let apiURL = 'https://www.googleapis.com/customsearch/v1?q=' + topic + '&siteSearch=' + source + '&cx=002705623704967956827:pzombzhphig&num=10&key=AIzaSyBw1YZdE3IItcnY9A_p0kHOS6TNhZEPi4w';
      this.http.get(apiURL)
        .toPromise().then((response) => {
          resolve(response);
        }).catch((err) => { reject(err) });
      // articles = { 10 articles }
    });
  }
  htmltotext(url) {
    return new Promise((resolve, reject) => {
      this.http.get(url, { responseType: 'text' })
        .toPromise().then((response) => {
          response = response.replace(/<[^>]*>/g, '')
          resolve(response);
        }).catch((err) => { reject(err); });
    });
  }
  analyzesentiment(text) {
    return new Promise((resolve, reject) => {
      this.http.post('https://language.googleapis.com/v1/documents:analyzeSentiment?key=AIzaSyBw1YZdE3IItcnY9A_p0kHOS6TNhZEPi4w', {
        document: {
          type: 'PLAIN_TEXT',
          content: text
        },
        // we need to test the other values (UTF8, UTF16, UTF32)
        encodingType: 'NONE'
      })
        .toPromise().then((response) => {
          resolve(response);
        }).catch((err) => { reject(err) });
    });
  }
  bialysis(topic, source) {
    return new Promise((resolve, reject) => {
      let promises = [];
      this.getarticles(topic, source).then((response) => {
        for (var i = 0; i < response.items.length; i++) {
          console.log(response.items[i].link);
          promises.push(new Promise((resolve, reject) => {
            this.htmltotext(response.items[i].link).then((response) => {
              this.analyzesentiment(response).then((response) => { resolve(response) });
            }).catch((err) => { console.log(err) })
          }));
        }
        Promise.all(promises).then((sentiments) => { resolve(sentiments) });
      }).catch((err) => { reject(err) });
    });
  }

  test() {
    return new Promise((resolve, reject) => {
      console.log("giong")
      var s = "(CNN)President Donald Trump won't release the Democratic rebuttal to the Republican intelligence memo alleging FBI abuses of its surveillance authority at this time, and has sent it back to the House Intelligence Committee for changes.In a letter to the committee, White House counsel Donald McGahn said, 'although the President is inclined to declassify the February 5th Memorandum, because the Memorandum contains numerous properly classified and especially sensitive passages, he is unable to do so at this time.''It's gonna be released soon,' Trump told reporters at the White House, adding, 'We're going to release a letter.'The House Intelligence Committee voted unanimously on Monday to release the 10-page Democratic memo, and the committee rules gave Trump five days to decide whether to block or allow its release.The memo from Rep. Adam Schiff of California, the top Democrat on the committee, was written to rebut the Republican memo released one week prior, which accuses the FBI of suppressing Democratic ties to an opposition research dossier on Trump and Russia used in the Foreign Intelligence Surveillance Act warrant for former Trump campaign foreign policy adviser Carter Page.Schiff and other Democrats charge that the Republican memo led by House Intelligence Chairman Devin Nunes of California is misleading and omits key facts, including that the FISA application did state that ex-British intelligence agent Christopher Steele, the author of the dossier, was paid by a political entity.'The Democratic response sets out the material facts that were necessary for the public to see that the FBI acted properly in seeking a FISA warrant on Carter Page,' Schiff said in a statement. 'After promising to treat the Democratic response in precisely the same way, the White House now seeks to have the Democratic memo sent back to committee and revised by the same Majority that produced the flawed Nunes document to begin with.'The White House included a letter signed by Deputy Attorney General Rod Rosenstein and FBI Director Christopher Wray that says they have identified portions of the Democratic memo that would raise national security or law enforcement concerns if released publicly.Trump cited concerns from the Justice Department and FBI in his objection to releasing the Democratic memo. But Trump ignored those concerns when he decided to release the Republican memo last week -- despite the FBI releasing a rare statement to say the Nunes memo omitted key information and the Justice Department raising 'grave concerns' about its release without proper review.Trump's objection puts the committee in uncharted waters, as the committee used an obscure rule that had never been invoked before to vote to release both memos.The White House allowed the Nunes memo to be made public. But with the objection to the Democratic memo, there is a procedure available to the House to override the objection and make it public anyway.That would require a vote of the full House after a rare debate in closed session for the full chamber.But it's not clear whether Republicans will be willing to take that step, and the GOP committee members were hesitant about defying Trump on the memo earlier this week.At the committee's Monday meeting where it voted to release the memo, Nunes expressed concerns that the Democratic memo went further than the Republican document in disclosing sources and methods.'This memo contains a large volume of classified information, including some touching on sources and methods heightening the potential damage to national security,' Nunes said.Schiff said he gave his memo to the Justice Department and FBI so they could review for national security concerns in addition to just a White House review, as he expressed concerns there would be 'political redactions' to the memo.'In order to rebut the errors, omissions and distortions in the Republican-drafted memo, we have included certain details beyond the revelations made public by the release of the majority's document,' Schiff said.Democrats immediately cried foul at the decision to send the Democratic memo back to the committee.'The President's double standard when it comes to transparency is appalling,' Sen. Chuck Schumer said in a statement. 'The rationale for releasing the Nunes memo, transparency, vanishes when it could show information that's harmful to him. Millions of Americans are asking one simple question: what is he hiding?'";
      this.analyzesentiment(s).then((response) => { resolve(response) }).catch((err) => { console.log(err) });
    })
  }
}