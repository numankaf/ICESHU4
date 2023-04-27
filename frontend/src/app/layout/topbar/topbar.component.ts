import {Component, Input} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";

import {LayoutService} from "../layout.service";
import {AuthenticationService} from "../../iceshu4/core/authentication.service";
import {AccountService} from "../../iceshu4/components/profile/account/account.service";


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})

export class TopbarComponent {
  @Input() sidenav!: MatSidenav;
  darkTheme = false;
  id: any;
  profileImage: any;
  fullname: any;
  role: any;

  constructor(public layoutService: LayoutService,
              private authenticationService: AuthenticationService,
              private accountService: AccountService) {
  }


  ngOnInit() {
    let token = this.authenticationService.getToken() || "";
    this.decodeJwtToken(token);
    this.id = this.decodeJwtToken(token);
    this.getProfileImage();
    this.darkTheme = localStorage.getItem("theme") === 'dark';
    this.changeTheme();
  }

  public decodeJwtToken(token: string): number {
    const decodedToken = this.authenticationService.decodeToken(token);
    return decodedToken.sub;
  }

  getProfileImage() {
    this.accountService.getUser(this.id).subscribe(data => {
      this.profileImage = data.profile_photo;
      this.fullname = data.name + " " + data.surname;
      this.role= data.role;
    })
  }

  changeTheme() {
    const theme = this.darkTheme ? 'dark' : 'light';
    const themeLink = <HTMLLinkElement>document.getElementById('theme-css');
    const newHref = themeLink.getAttribute('href')!.replace(this.layoutService.config.theme, theme);
    this.replaceThemeLink(newHref, () => {
      this.layoutService.config.theme = theme;
      this.layoutService.onConfigUpdate();
      localStorage.setItem("theme", theme);
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

  logout() {
    this.authenticationService.logout();
  }

}
