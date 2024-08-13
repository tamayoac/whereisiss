import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISSLocation } from '../model/iss-location.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ISSLocationService {
  private apiUrl = environment.issapi

  constructor(private http: HttpClient) {}

  getLocation(): Observable<ISSLocation> {
    return this.http.get<ISSLocation>(this.apiUrl);
  }
}