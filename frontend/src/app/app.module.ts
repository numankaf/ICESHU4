import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatDividerModule} from "@angular/material/divider";
import {MatButtonModule} from "@angular/material/button";
import {CardModule} from "primeng/card";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import { DashboardComponent } from './iceshu4/dashboard/dashboard.component';
import {SelectButtonModule} from "primeng/selectbutton";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StyleClassModule} from "primeng/styleclass";
import {RippleModule} from "primeng/ripple";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {ButtonModule} from "primeng/button";
import {InputSwitchModule} from "primeng/inputswitch";
import { LoginComponent } from './iceshu4/auth/login/login.component';
import {CheckboxModule} from "primeng/checkbox";
import {ChipsModule} from "primeng/chips";
import { RegisterComponent } from './iceshu4/auth/register/register.component';
import {DividerModule} from "primeng/divider";
import {PasswordModule} from "primeng/password";
import { LandingComponent } from './iceshu4/landing/landing.component';
import { ForgotpasswordComponent } from './iceshu4/auth/forgotpassword/forgotpassword.component';
import {CarouselModule} from "primeng/carousel";
import {AvatarModule} from "primeng/avatar";
import { ProfileLayoutComponent } from './layout/profile-layout/profile-layout.component';
import { AccountComponent } from './iceshu4/components/profile/account/account.component';
import { TopbarComponent } from './layout/topbar/topbar.component';
import {DropdownModule} from "primeng/dropdown";
import {DialogModule} from "primeng/dialog";

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    LandingComponent,
    ForgotpasswordComponent,
    ProfileLayoutComponent,
    AccountComponent,
    TopbarComponent
  ],
    imports: [
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
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
