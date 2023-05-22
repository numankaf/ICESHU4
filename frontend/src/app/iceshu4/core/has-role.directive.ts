import {Directive, ElementRef, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthenticationService} from "./authentication.service";

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective {


  constructor(private authenticationService:AuthenticationService,
              private template: TemplateRef<any>,
              private view: ViewContainerRef,) { }


  @Input() set appHasRole(roles: any){
    const hasRole = this.authenticationService.hasAnyRole(roles);

    if(hasRole){
      this.view.createEmbeddedView(this.template);
    }else{
      this.view.clear();
    }

  }
}
