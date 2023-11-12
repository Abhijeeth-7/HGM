import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-config-backup',
  templateUrl: './config-backup.component.html',
})
export class ConfigBackupComponent implements OnInit {
  configurationData: any = '';
  timestamp: string;
  subscriptions: Subscription = new Subscription();
  isCodeCopied: boolean;

  constructor(private service: SharedService) {
    this.configurationData =
      'Please visit home page and configure the gesture data';
  }

  ngOnInit(): void {
    const backUpChangeListener = this.service.configListner.subscribe(
      (data: any) => {
        if (data.gestureList) {
          this.configurationData = this.getBackUpString(
            data.gestureList,
            data.actionsList,
            data.appNamesList
          );
          this.timestamp = this.service.getCurrentTimestamp();
        }
      }
    );
    this.subscriptions.add(backUpChangeListener);
  }

  copyToClipBoard(codeBlock: HTMLPreElement) {
    let selBox = document.createElement('textarea');
    selBox.value = codeBlock.innerText;
    document.body.appendChild(selBox);
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.isCodeCopied = true;
  }

  getBackUpString(gestureList, actionsList, appNamesList): string {
    let configString = '';
    gestureList.forEach((gesture, index) => {
      if (index != 0) {
        configString += ';';
      }
      configString = configString.concat(JSON.stringify(gesture));
    });
    configString += '\n';
    actionsList.forEach((gesture, index) => {
      if (index != 0) {
        configString += ';';
      }
      configString = configString.concat(JSON.stringify(gesture));
    });
    configString += '\n';
    appNamesList.forEach((gesture, index) => {
      if (index != 0) {
        configString += ';';
      }
      configString = configString.concat(JSON.stringify(gesture));
    });
    return configString;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
