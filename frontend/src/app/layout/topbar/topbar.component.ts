import {Component, Input} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";

import {LayoutService} from "../layout.service";
import {AuthenticationService} from "../../iceshu4/core/authentication.service";


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})

export class TopbarComponent {
  @Input() sidenav!: MatSidenav;
  darkTheme = false;

  constructor(public layoutService: LayoutService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
  }


  changeTheme() {
    const theme = this.darkTheme ? 'dark' : 'light';
    const themeLink = <HTMLLinkElement>document.getElementById('theme-css');
    const newHref = themeLink.getAttribute('href')!.replace(this.layoutService.config.theme, theme);
    this.replaceThemeLink(newHref, () => {
      this.layoutService.config.theme = theme;
      this.layoutService.onConfigUpdate();
    });
  }

  replaceThemeLink(href: string, onComplete: Function) {
    const id = 'theme-css';
    const themeLink = <HTMLLinkElement>document.getElementById('theme-css');
    const cloneLinkElement = <HTMLLinkElement>themeLink.cloneNode(true);

    cloneLinkElement.setAttribute('href', href);
    cloneLinkElement.setAttribute('id', id + '-clone');

    themeLink.parentNode!.insertBefore(cloneLinkElement, themeLink.nextSibling);

    cloneLinkElement.addEventListener('load', () => {
      themeLink.remove();
      cloneLinkElement.setAttribute('id', id);
      onComplete();
    });
  }

  logout(){
    this.authenticationService.logout();
  }

}
