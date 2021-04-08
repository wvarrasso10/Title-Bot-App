import { Component } from '@angular/core';
import {WebScraperService} from '../services/web-scraper.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-title-search',
  templateUrl: './title-search.component.html',
  styleUrls: ['./title-search.component.css']
})
export class TitleSearchComponent {
  url: string;
  form: FormGroup = new FormGroup({});
  headline: string;
  headlines = [];

  constructor(private webService: WebScraperService, private fb: FormBuilder) {
    // Regex to match Url
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.form = fb.group({
      url: ['', [Validators.required, Validators.pattern(reg)]]
    });
  }

  submit(): void {
    this.FormatUrl();
    // subscribe to observable returned get request
    this.webService.getHeadline(this.url).subscribe(
      res => {
        this.headline = JSON.stringify(res);
        this.headlines.push(this.headline);
      }
    );
  }

  clear(): void {
    this.headlines = [];
    this.headline = '';
    this.form.value.reset();
  }

  private FormatUrl(): void {
    // convert form value to url and check for Http prefix
    this.url = JSON.stringify(this.form.value.url);
    this.url = this.url.replace(/^"(.+(?="$))"$/, '$1');
    this.url = this.url.match('(https?://)') ? this.url : 'https://' + this.url;
  }
  // return abstract control form from headline input check check validity
  get f(): {[p: string]: AbstractControl} {
    return this.form.controls;
  }
}
