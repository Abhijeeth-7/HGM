import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-generated-code',
  templateUrl: './generated-code.component.html',
})
export class GeneratedCodeComponent implements OnInit {
  generatedCode: string;
  timestamp: string;
  isCodeCopied: boolean;
  constructor(private service: SharedService, private modalRef: BsModalRef) {}

  ngOnInit(): void {
    this.service.codeGenListner.subscribe((data) => {
      this.generatedCode = data;
      this.timestamp = this.service.getCurrentTimestamp();
    });
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

  closeModal() {
    this.modalRef.hide();
  }
}
