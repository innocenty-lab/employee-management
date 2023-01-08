import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent {
  titleCard: string = "Employee Detail"
  data: any = this.router.getCurrentNavigation()?.extras.state;

  constructor(private router: Router) {
  }
}
