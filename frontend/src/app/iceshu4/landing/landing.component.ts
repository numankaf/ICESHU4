import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  carouselImages: any[] = [
    {
      url: 'assets/layout/images/carousel/carouseimage1.PNG',
      content: 'Courses'
    },
    {
      url: 'assets/layout/images/carousel/carouseimage4.PNG',
      content: 'Evaluation Forms'
    },
    {
      url: 'assets/layout/images/carousel/carouseimage3.PNG',
      content: 'Chat with Admin'
    },
    {
      url: 'assets/layout/images/carousel/carouseimage2.PNG',
      content: 'Profile Overview'
    },
  ];
  constructor() {
  }
  ngOnOInit() :void {

  }
}
