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
  private myIcon! :L.Icon;
  // private centeroid: L.LatLngExpression = [this.latitude ,this.longitude];

 
  private initMap(): void {
  
    this.map = L.map('map').setView([0,0], 6);

    this.myIcon = L.icon({
      iconUrl: '../../../assets/images/international-space-station-icon.png',
      iconSize: [60, 42],
      iconAnchor: [25, 16],
      popupAnchor: [-3, -76],
    });
    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
      maxZoom: 10,
      noWrap: true,
      attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.marker = L.marker([0,0], {icon: this.myIcon }).addTo(this.map)
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
