import {StudentLayoutComponent} from './layout/student-layout/student-layout.component';
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
import {AdminLayoutComponent} from "./layout/admin-layout/admin-layout.component";
import {InstructorLayoutComponent} from "./layout/instructor-layout/instructor-layout.component";
import {DepartmentManagerLayoutComponent} from "./layout/department-manager-layout/department-manager-layout.component";
import {UsersComponent} from "./iceshu4/components/admin/users/users.component";
import {SemestersComponent} from "./iceshu4/components/admin/semesters/semesters.component";
import {ChangepasswordComponent} from "./iceshu4/components/profile/changepassword/changepassword.component";
import {CourseComponent} from "./iceshu4/components/course/course.component";
import {CoursedetailComponent} from "./iceshu4/components/course/coursedetail/coursedetail.component";
import {MessageComponent} from "./iceshu4/components/message/message.component";
import {DetailMessageComponent} from "./iceshu4/components/message/detail-message/detail-message.component";

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
      path: 'student', component: StudentLayoutComponent,
      canActivate:[AuthGuard],
      data:{
        roles: ["STUDENT"]
      },
      children: [
        {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
        {path: 'dashboard', component: DashboardComponent},
        {path: 'courses', component: CourseComponent},
        {path: 'courses/:id', component: CoursedetailComponent},
        {path: 'forms', component: DashboardComponent},
        {path: 'messages', component: MessageComponent},
        {path: 'messages/:id', component: DetailMessageComponent},
        {path: 'about', component: DashboardComponent},
        {path: 'help', component: DashboardComponent},
      ]
    },
    {
      path: 'admin', component: AdminLayoutComponent,
      canActivate:[AuthGuard],
      data:{
        roles: ["ADMIN"]
      },
      children: [
        {path: '', redirectTo: 'users', pathMatch: 'full'},
        {path: 'users', component: UsersComponent},
        {path: 'semesters', component: SemestersComponent},
        {path: 'courses', component: CourseComponent},
        {path: 'courses/:id', component: CoursedetailComponent},
        {path: 'messages', component: MessageComponent},
        {path: 'messages/:id', component: DetailMessageComponent},
        {path: 'bans', component: DashboardComponent},
      ]
    },
    {
      path: 'instructor', component: InstructorLayoutComponent,
      canActivate:[AuthGuard],
      data:{
        roles: ["INSTRUCTOR"]
      },
      children: [
        {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
        {path: 'dashboard', component: DashboardComponent},
        {path: 'courses', component: CourseComponent},
        {path: 'courses/:id', component: CoursedetailComponent},
        {path: 'forms', component: DashboardComponent},
        {path: 'resources', component: DashboardComponent},
        {path: 're-evaluationrequests', component: DashboardComponent},
      ]
    },
    {
      path: 'departmentmanager', component: DepartmentManagerLayoutComponent,
      canActivate:[AuthGuard],
      data:{
        roles: ["DEPARTMENT_MANAGER"]
      },
      children: [
        {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
        {path: 'dashboard', component: DashboardComponent},
        {path: 'courses', component: CourseComponent},
        {path: 'courses/:id', component: CoursedetailComponent},
        {path: 'forms', component: DashboardComponent},
        {path: 'resources', component: DashboardComponent},
        {path: 're-evaluationrequests', component: DashboardComponent},
      ]
    },
    {
      path: 'profile', component: ProfileLayoutComponent,
      canActivate:[AuthGuard],
      data: {
        roles:["ADMIN", "STUDENT", "DEPARTMENT_MANAGER","INSTRUCTOR"]
      },
      children: [
        {path: '', redirectTo: 'account', pathMatch: 'full'},
        {path: 'account', component: AccountComponent},
        {path: 'changepassword', component: ChangepasswordComponent},
      ]
    },

    {path: 'landing', component: LandingComponent}

  ])],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
