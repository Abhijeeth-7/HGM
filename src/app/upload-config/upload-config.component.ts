import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-upload-config',
  templateUrl: './upload-config.component.html',
})
export class UploadConfigComponent implements OnInit {
  uploadedText: string;
  onUpload: any;

  constructor(private modalref: BsModalRef) {}

  ngOnInit(): void {}

  uploadConfig() {
    let dataSet: { [index: string]: any } = [];
    dataSet.gestureList = [];
    dataSet.actionList = [];
    dataSet.appList = [];

    let p1 = this.uploadedText.split('\n')[0].trim().split(';');
    p1.forEach((p: string) => {
      dataSet.gestureList.push(JSON.parse(p));
    });
    let p2 = this.uploadedText.split('\n')[1].trim().split(';');
    p2.forEach((p: string) => {
      dataSet.actionList.push(JSON.parse(p));
    });
    let p3 = this.uploadedText.split('\n')[2].trim().split(';');
    p3.forEach((p: string) => {
      dataSet.appList.push(JSON.parse(p));
    });
    this.onUpload(dataSet);
    this.closeModal();
  }

  closeModal() {
    this.modalref.hide();
  }
}
