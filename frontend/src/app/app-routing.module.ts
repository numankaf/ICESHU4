import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./iceshu4/dashboard/dashboard.component";

@NgModule({
  imports: [RouterModule.forRoot([
    { path: '', component: MainLayoutComponent,
      children :[
        {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
        {path:'dashboard' , component :DashboardComponent},
        {path:'classes' , component :DashboardComponent},
        {path:'forms' , component :DashboardComponent},
        {path:'about' , component :DashboardComponent},
        {path:'help' , component :DashboardComponent},

      ]},

  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
