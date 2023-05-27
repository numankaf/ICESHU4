import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";
import {LayoutService} from "../layout.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-layout',
  templateUrl: '../main-layout.component.html',
  styleUrls: ['../main-layout.component.scss']
})
export class AdminLayoutComponent implements AfterViewInit{
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  menuItems: any;

  constructor(private observer: BreakpointObserver,
              public layoutService: LayoutService,
              private router: Router) {
  }

  ngOnInit() {
    this.menuItems = [
      {icon: 'group', name: 'System Users', route: '/admin/users'},
      {icon: 'calendar_view_week', name: 'Semesters', route: '/admin/semesters'},
      {icon: 'library_books',name:'Courses', route:'/admin/courses'},
      {icon: 'feed',name:'All Forms', route:'/admin/forms'},
      {icon: 'forum', name: 'Messages', route: '/admin/messages'},
      {icon: 'block', name: 'Ban Students', route: '/admin/bans'},
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
