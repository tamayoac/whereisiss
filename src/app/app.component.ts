import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'FirstAngularApp';
  latitude: Number;
  longitude: Number;
  velocity: Number;
  altitude: Number;
  time: Number;

  ngOnInit(): void {
    this.getISSLocation()
    setInterval(() => {
      this.getISSLocation(); 
    }, 1000);
  }
  constructor(private httpClient: HttpClient) {
    this.latitude = 0.0,
    this.longitude = 0.0,
    this.velocity = 0.0,
    this.altitude = 0.0,
    this.time = 0.0;
  }

  private async getISSLocation() {
    await this.httpClient.get<any>('https://api.wheretheiss.at/v1/satellites/25544').subscribe(
      response => {
        this.latitude = response.latitude,
        this.longitude = response.longitude,
        this.velocity = response.velocity,
        this.altitude = response.altitude,
        this.time = response.timestamp
        console.log(response)
      }
    )
  }
}

