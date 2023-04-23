import {MainLayoutComponent} from './layout/main-layout/main-layout.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./iceshu4/dashboard/dashboard.component";
import {LoginComponent} from "./iceshu4/auth/login/login.component";
import {RegisterComponent} from "./iceshu4/auth/register/register.component";
import {LandingComponent} from "./iceshu4/landing/landing.component";
import {ForgotpasswordComponent} from "./iceshu4/auth/forgotpassword/forgotpassword.component";
import {AccountComponent} from "./iceshu4/components/profile/account/account.component";
import {ProfileLayoutComponent} from "./layout/profile-layout/profile-layout.component";
import {AuthGuard} from "./iceshu4/core/auth.guard";

@NgModule({
  imports: [RouterModule.forRoot([
    {path: '', redirectTo: 'landing', pathMatch: 'full'},
    {path: 'auth',
      children: [
        {path: '', redirectTo: 'login', pathMatch: 'full'},
        {path: 'login', component: LoginComponent},
        {path: 'signup', component: RegisterComponent},
        {path: 'forgotpassword', component: ForgotpasswordComponent},
      ]
    },
    {
      path: 'main', component: MainLayoutComponent,
      canActivate:[AuthGuard],
      children: [
        {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
        {path: 'dashboard', component: DashboardComponent},
        {path: 'classes', component: DashboardComponent},
        {path: 'forms', component: DashboardComponent},
        {path: 'about', component: DashboardComponent},
        {path: 'help', component: DashboardComponent},
      ]
    },
    {
      path: 'profile', component: ProfileLayoutComponent,
      canActivate:[AuthGuard],
      children: [
        {path: '', redirectTo: 'account', pathMatch: 'full'},
        {path: 'account', component: AccountComponent},
        {path: 'changepassword', component: AccountComponent},
        {path: 'messages', component: AccountComponent},
      ]
    },

    {path: 'landing', component: LandingComponent}

  ])],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
