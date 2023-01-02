import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  reports: any = []

  constructor(private http: HttpClient) {}

  postReport(data: any) {
    let key = data.name.split(" ").join('')
    let id = data.pid
    return this.http.post<any>("https://272.selfip.net/apps/YXwIenhj1S/collections/piggybank/documents/", {"key": key+id, "data": data})
  }

  getReport() {
    return  this.http.get<any>("https://272.selfip.net/apps/YXwIenhj1S/collections/piggybank/documents/")
  
  }

  deleteReport(name: String, id: Number) {
    let key = name.split(" ").join('')
    return this.http.delete<any>("https://272.selfip.net/apps/YXwIenhj1S/collections/piggybank/documents/"+key+id)
  }
}
