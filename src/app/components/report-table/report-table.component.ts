import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ApiService} from "./../../services/api.service"

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.css']
})
export class ReportTableComponent implements OnInit {
  status = "Ready for PickUp"
  reports: any
  displayedColumns: string[] = ['pid', 'date', 'name', 'time', "breed", 'location', 'extraNotes', 'phoneNumber', "status"];
  dataSource! : MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getAllReports()
  }

  getAllReports() {
    this.api.getReport()
    .subscribe({
      next: (res: any) => {
        console.log(res)
        
        this.api.reports = res
        this.reports = res.map((dat: any) => dat.data)
        this.dataSource = new MatTableDataSource(this.reports)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      },
      error: (err: any) => {
        alert("Error occurred while fetching reports")
      }
    })
  }

  deleteReport(name: String, id: number) {
    this.api.deleteReport(name, id)
    .subscribe({
      next: (res) => {
        alert("Successfully deleted")
        window.location.reload()
      },
      error: (err) => {
        alert("Error occurred while deleting")
      }
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
