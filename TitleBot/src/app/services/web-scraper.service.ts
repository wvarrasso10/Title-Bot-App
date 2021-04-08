import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {WebPage} from '../models/web-page.model';

@Injectable({
  providedIn: 'root'
})
export class WebScraperService {
  formData!: WebPage;
  readonly rootUrl = 'https://localhost:5000/api';
  constructor(private http: HttpClient) { }

  getHeadline(Url: string): Observable<any> {
    return this.http.get<WebPage>(this.rootUrl + '/WebPage' + '?url=' + Url)
      .pipe(tap((receivedData: WebPage) => console.log(receivedData)));
  }
}
