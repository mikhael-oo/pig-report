import { Component, OnInit } from '@angular/core';
import {ApiService} from "./services/api.service"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'pig-report';
  report: any

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getAllReports()
  }

  getAllReports() {
    this.api.getReport()
    .subscribe({
      next: (res: any) => {
        console.log(res)
        this.report = res
      },
      error: (err: any) => {
        alert("Error occurred while fetching reports")
      }
    })
  }
}
