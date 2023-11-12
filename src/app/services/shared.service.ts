import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  codeGenEvent = new BehaviorSubject<string>('');
  codeGenListner = this.codeGenEvent.asObservable();
  configEvent = new BehaviorSubject<any>('');
  configListner = this.configEvent.asObservable();
  currentConfig: { [index: string]: any } = {};

  getCurrentTimestamp(): string {
    let d = new Date();
    return `${d.getHours()} : ${d.getMinutes()}`;
  }
}
