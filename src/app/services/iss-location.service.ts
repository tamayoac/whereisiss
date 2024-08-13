import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISSLocation } from '../model/iss-location.model';

@Injectable({
  providedIn: 'root',
})
export class ISSLocationService {
  private apiUrl = 'https://api.wheretheiss.at/v1/satellites/25544';

  constructor(private http: HttpClient) {}

  getLocation(): Observable<ISSLocation> {
    return this.http.get<ISSLocation>(this.apiUrl);
  }
}