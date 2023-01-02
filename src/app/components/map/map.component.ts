import { Component, AfterViewInit, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as L from 'leaflet';
import 'mapbox-gl-leaflet';
import {ApiService} from "../../services/api.service"

// need to add to make leaflet icons work
import { icon, Marker } from 'leaflet';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
}); 
Marker.prototype.options.icon = iconDefault;


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map: any;
  reports: any

  constructor(private api: ApiService) { }

  ngAfterViewInit(): void { 
    this.getAllReports
    this.map = L.map('mapid').setView([49.2, -123], 11);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWlraGFlbG9sYXQiLCJhIjoiY2xiMWQ1cDVuMXM2MDNvbnAwcGxmYmRuNCJ9.KLcvWVdITMGmL_qgWh3gzw', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1
    }).addTo(this.map);

    L.marker([49.2276, -123.0076]).addTo(this.map)
    .bindPopup("<b>Metrotown</b><br />cases reported.").openPopup();

    L.marker([49.1867, -122.8490]).addTo(this.map)
    .bindPopup("<b>SFU Surrey</b><br />cases reported.").openPopup();
    console.log("map")
    console.log(this.reports)

    this.reports.forEach((report: any) => {
      return L.marker([report.latitude, report.longitude]).addTo(this.map)
      .bindPopup(`<b>${report.location}</b><br />cases reported.`).openPopup();
    })

  }

  getAllReports() {
    this.api.getReport()
    .subscribe({
      next: (res: any) => {
        console.log(res)
        
        this.api.reports = res
        this.reports = res.map((dat: any) => dat.data)
        
      },
      error: (err: any) => {
        alert("Error occurred while fetching reports")
      }
    })
  }

}

