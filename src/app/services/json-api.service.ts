import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Element} from '../model/element.model'
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class JsonApiService {
  url = 'https://my-json-server.typicode.com/f4bb1o/json-server/';

  constructor(private http: HttpClient) { }

  getElementsFromServices(query : string): Observable<Element[]> {
    return this.http.get<Element[]>(this.url + `/element?q=${query}`);
  }

  getElements(query : string): Observable<Element[]> {
    return this.http.get<Element[]>(this.url + `/element?name=${query}`);
  }

  getArea(query : string): Observable<Element[]> {
    return this.http.get<Element[]>(this.url + `/element?area=${query}`);
  }
}
