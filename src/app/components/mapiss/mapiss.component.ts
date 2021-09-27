import { Component, OnInit, Input } from '@angular/core';
import * as L from 'leaflet';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;
@Component({
  selector: 'app-mapiss',
  templateUrl: './mapiss.component.html',
  styleUrls: ['./mapiss.component.scss']
})

export class MapissComponent implements OnInit {

  @Input() latitude!: any;
  @Input() longitude!: any;
  private map!: L.Map;
  private marker!: L.Marker;
  // private centeroid: L.LatLngExpression = [this.latitude ,this.longitude];

 
  private initMap(): void {
  
    this.map = L.map('map').setView([0,0], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 10,
      noWrap: true,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    this.marker = L.marker([0,0]).addTo(this.map)
  }

  private updateLocation(lat: any, long: any): void{
    
    this.marker.setLatLng([lat, long]);
  
      this.map.setView([lat, long], this.map.getZoom());
  }
  ngOnInit(): void {
   
    this.initMap();
    setInterval(() => {
      this.updateLocation(this.latitude, this.longitude)
    }, 1000);
   

  }
  constructor() { }

}
