import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {EmployeeDetailComponent} from "./pages/employee-detail/employee-detail.component";

const routes: Routes = [
  // {path:'', redirectTo:'login', pathMatch:'full'},
  // {path:'login', component:LoginComponent},
  // {path:'dashboard', component:DashboardComponent},
  // {path:'employee-detail', component:EmployeeDetailComponent},
  // {path:'**', component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
