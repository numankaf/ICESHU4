import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";
import {LayoutService} from "../layout.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-department-manager-layout',
  templateUrl: '../main-layout.component.html',
  styleUrls: ['../main-layout.component.scss']
})
export class DepartmentManagerLayoutComponent implements AfterViewInit{
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  menuItems: any;

  constructor(private observer: BreakpointObserver,
              public layoutService: LayoutService,
              private router: Router) {
  }

  ngOnInit() {
    this.menuItems = [
      {icon: 'dashboard',name:'Dashboard', route:'/departmentmanager/dashboard'},
      {icon: 'library_books',name:'Classes', route:'/departmentmanager/classes'},
      {icon: 'feed',name:'All Forms', route:'/departmentmanager/forms'},
      {icon: 'folder_copy',name:'Resources', route:'/departmentmanager/resources'},
      {icon: 'request_quote',name:'Re-evaluation Requests', route:'/departmentmanager/re-evaluationrequests'},


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
