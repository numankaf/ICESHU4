import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface AppConfig {
  theme: string;
}
@Injectable({
  providedIn: 'root',
})
export class LayoutService {

  config : AppConfig = {
    theme: 'light',

  };

  private configUpdate = new Subject<AppConfig>();
  onConfigUpdate() {
    this.configUpdate.next(this.config);
  }

}
