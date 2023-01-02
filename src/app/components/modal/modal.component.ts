import { Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {ApiService} from './../../services/api.service'


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  selected = "unknown"
  reportForm !: FormGroup
  constructor(private formBuilder: FormBuilder, private api: ApiService, private dialogRef: MatDialogRef<ModalComponent>) { }

  

  ngOnInit(): void {
    this.reportForm = this.formBuilder.group({
      name : ["", Validators.required],
      phoneNumber : ["", Validators.required],
      breed : ["", Validators.required],
      pid : ["", Validators.required],
      location: ["", Validators.required],
      longitude : ["", Validators.required],
      latitude : ["", Validators.required],
      extraNotes : ["", Validators.required],
      time : ["", Validators.required],
      date : ["", Validators.required]
    })
  }

  addReport() {
    if (this.reportForm.valid) {
      this.api.postReport(this.reportForm.value)
      .subscribe({
        next: (res: any) => {
          alert("Report Created Successfully")
          this.api.reports.push(res)
          this.reportForm.reset()
          this.dialogRef.close()
          window.location.reload();
        },
        error: () => {
          alert("Error occurred while creating report")
        }
      })
    }
  }

}
