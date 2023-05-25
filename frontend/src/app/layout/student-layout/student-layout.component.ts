import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";
import {Router} from "@angular/router";
import {LayoutService} from "../layout.service";

@Component({
  selector: 'app-student-layout',
  templateUrl: '../main-layout.component.html',
  styleUrls: ['../main-layout.component.scss']
})
export class StudentLayoutComponent implements AfterViewInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  menuItems: any;

  constructor(private observer: BreakpointObserver,
              public layoutService: LayoutService,
              private router: Router) {
  }

  ngOnInit() {
    this.menuItems = [
      {icon: 'dashboard',name:'Dashboard', route:'/student/dashboard'},
      {icon: 'library_books',name:'Courses', route:'/student/courses'},
      {icon: 'feed',name:'Forms', route:'/student/forms'},
      {icon: 'forum', name: 'Messages', route: '/student/messages'},
      {icon: 'info',name:'About', route:'/student/about'},
      {icon: 'help',name:'Help', route:'/student/help'},

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
