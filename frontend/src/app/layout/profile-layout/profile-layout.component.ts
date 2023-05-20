import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";
import {LayoutService} from "../layout.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../iceshu4/core/authentication.service";

@Component({
  selector: 'app-profile-layout',
  templateUrl: '../main-layout.component.html',
  styleUrls: ['../main-layout.component.scss']
})
export class ProfileLayoutComponent implements AfterViewInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  menuItems: any;

  constructor(private observer: BreakpointObserver,
              public layoutService: LayoutService,
              private router: Router,
              private authenticationService: AuthenticationService) {
  }


  ngOnInit() {
    this.menuItems = [
      {icon: 'account_circle', name: 'Account', route: '/profile/account'},
      {icon: 'key', name: 'Change Password', route: '/profile/changepassword'},
      {icon: 'first_page', name: 'Back to Main Menu', route: this.getRoute()},

    ]
  }

  getRoute() {
    const role = this.authenticationService.getRole();
    if (role === "ADMIN") {
      return '/admin';
    } else if (role === "DEPARTMENT_MANAGER") {
      return '/departmentmanager';
    } else if (role === "INSTRUCTOR") {
      return '/instructor';
    } else {
      return '/student';
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.observer
        .observe(['(max-width: 800px)'])
        .subscribe((res) => {
          if (res.matches) {
            this.sidenav.mode = 'over';
            this.sidenav.close();
          } else {
            this.sidenav.mode = 'side';
            this.sidenav.open();
          }
        });
    });
  }

}
