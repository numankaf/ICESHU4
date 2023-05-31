import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  carouselImages: any[] = [
    {
      url: 'assets/layout/images/carousel/course.png',
      content: 'Courses'
    },
    {
      url: 'assets/layout/images/carousel/forms.png',
      content: 'Evaluation Forms'
    },
    {
      url: 'assets/layout/images/carousel/message.png',
      content: 'Chat with Admin'
    },
    {
      url: 'assets/layout/images/carousel/profile.png',
      content: 'Profile Overview'
    },
    {
      url: 'assets/layout/images/carousel/users.png',
      content: 'User Management'
    },
  ];
  constructor() {
  }
  ngOnOInit() :void {

  }
}
