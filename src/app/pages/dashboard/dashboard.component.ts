import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog-form/dialog.component";
import {EmployeeService} from "../../services/employee.service";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {AuthGuard} from "../../shared/guard/auth.guard";
import Swal from "sweetalert2";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  title: string = "Employee Management";
  displayedColumns: string[] = ['username', 'email', 'basicSalary', 'status', 'group', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private employeeServ: EmployeeService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private authGuard: AuthGuard
  ) {
  }

  ngOnInit(): void {
    this.onGetALlEmployees();
    // console.log("isLoggedIn: ", this.authGuard.isLoggedIn);
  }

  onOpenDialog() {
    this.dialog.open(DialogComponent, {
      width: '40%'
    })
      .afterClosed().subscribe(value => {
      if (value === 'save') {
        this.onGetALlEmployees();
      }
    });
  }

  onGetALlEmployees() {
    this.employeeServ.getEmployee()
      .subscribe({
        next: (res) => {
          // console.log("getAllEmployees: ", res);
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error while fetching the Records',
          })
        }
      })
  }

  onApplyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onEditEmployee(row: any) {
    this.dialog.open(DialogComponent, {
      width: '40%',
      data: row
    })
      .afterClosed().subscribe(value => {
      if (value === 'update') {
        this.onGetALlEmployees();
      }
    })
  }

  onDeleteProduct(id: number) {
    Swal.fire({
      title: 'Are you sure to delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeServ.deleteEmployee(id)
          .subscribe({
            next: (res) => {
              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Employee delete successfully',
              })
              this.onGetALlEmployees();
            },
            error: () => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error while deleting employee',
              })
            }
          })
      }
    })
  }

  onDetailEmployee(row: any) {
    this.router.navigate(['employee-detail'], {state: row});
  }

  onLogout() {
    this.authService.logout();
  }
}
