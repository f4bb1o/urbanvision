import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { ReverseObject } from '../../model/nominatim/reverseObject.model';


@Injectable({
  providedIn: 'root'
})
export class NominatimService {

  constructor(private http : HttpClient) { }

  url = 'https://nominatim.openstreetmap.org/';

  getReverseGeocoding(lon : string,lat : string): Observable<ReverseObject> {
    return this.http.get<ReverseObject>(this.url + `reverse?format=json&lon=${lon}&lat=${lat}`);
  }
}
