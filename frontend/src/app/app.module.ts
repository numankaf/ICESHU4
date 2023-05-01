import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StudentLayoutComponent} from './layout/student-layout/student-layout.component';
import {InstructorLayoutComponent} from "./layout/instructor-layout/instructor-layout.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatDividerModule} from "@angular/material/divider";
import {MatButtonModule} from "@angular/material/button";
import {CardModule} from "primeng/card";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import {DashboardComponent} from './iceshu4/dashboard/dashboard.component';
import {SelectButtonModule} from "primeng/selectbutton";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StyleClassModule} from "primeng/styleclass";
import {RippleModule} from "primeng/ripple";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {ButtonModule} from "primeng/button";
import {InputSwitchModule} from "primeng/inputswitch";
import {LoginComponent} from './iceshu4/auth/login/login.component';
import {CheckboxModule} from "primeng/checkbox";
import {ChipsModule} from "primeng/chips";
import {RegisterComponent} from './iceshu4/auth/register/register.component';
import {DividerModule} from "primeng/divider";
import {PasswordModule} from "primeng/password";
import {LandingComponent} from './iceshu4/landing/landing.component';
import {ForgotpasswordComponent} from './iceshu4/auth/forgotpassword/forgotpassword.component';
import {CarouselModule} from "primeng/carousel";
import {AvatarModule} from "primeng/avatar";
import {ProfileLayoutComponent} from './layout/profile-layout/profile-layout.component';
import {AccountComponent} from './iceshu4/components/profile/account/account.component';
import {TopbarComponent} from './layout/topbar/topbar.component';
import {DropdownModule} from "primeng/dropdown";
import {DialogModule} from "primeng/dialog";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MessagesModule} from "primeng/messages";
import {AuthInterceptor} from './iceshu4/core/auth-interceptor';
import {InputTextareaModule} from "primeng/inputtextarea";
import {CalendarModule} from "primeng/calendar";
import {ToastModule} from "primeng/toast";
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { DepartmentManagerLayoutComponent } from './layout/department-manager-layout/department-manager-layout.component';
import { UsersComponent } from './iceshu4/components/admin/users/users.component';
import { SemestersComponent } from './iceshu4/components/admin/semesters/semesters.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentLayoutComponent,
    InstructorLayoutComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    LandingComponent,
    ForgotpasswordComponent,
    ProfileLayoutComponent,
    AccountComponent,
    TopbarComponent,
    AdminLayoutComponent,
    DepartmentManagerLayoutComponent,
    UsersComponent,
    SemestersComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatDividerModule,
    MatButtonModule,
    CardModule,
    MatListModule,
    MatMenuModule,
    SelectButtonModule,
    FormsModule,
    StyleClassModule,
    RippleModule,
    OverlayPanelModule,
    ButtonModule,
    InputSwitchModule,
    CheckboxModule,
    ChipsModule,
    ReactiveFormsModule,
    DividerModule,
    PasswordModule,
    CarouselModule,
    AvatarModule,
    DropdownModule,
    DialogModule,
    MessagesModule,
    InputTextareaModule,
    CalendarModule,
    ToastModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
