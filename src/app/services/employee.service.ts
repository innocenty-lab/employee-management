import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Employee} from "../models/employee.model";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {
  }

  baseUrl = 'https://630cf6ef53a833c534397519.mockapi.io/employee';

  postEmployee(data: any) {
    return this.http.post<any>(this.baseUrl, data);
  }

  getEmployee() {
    return this.http.get<Employee[]>(this.baseUrl);
  }

  putEmployee(id: number, data: any) {
    console.log("cek: ", id);
    return this.http.put<any>(this.baseUrl + '/' + id.toString(), data);
  }

  deleteEmployee(id: number) {
    return this.http.delete<any>(this.baseUrl + '/' + id.toString());
  }
}
