import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";
import {Router} from "@angular/router";
import {LayoutService} from "../layout.service";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['main-layout.component.scss']
})
export class MainLayoutComponent implements AfterViewInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  menuItems: any;

  constructor(private observer: BreakpointObserver,
              public layoutService: LayoutService,
              private router: Router) {
  }

  ngOnInit() {
    this.menuItems = [
      {icon: 'dashboard',name:'Dashboard', route:'/main/dashboard'},
      {icon: 'library_books',name:'Classes', route:'/main/classes'},
      {icon: 'feed',name:'Forms', route:'/main/forms'},
      {icon: 'info',name:'About', route:'/main/about'},
      {icon: 'help',name:'Help', route:'/main/help'},

      ]
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