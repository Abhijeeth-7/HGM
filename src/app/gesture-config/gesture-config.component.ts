import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { config } from 'rxjs';
import { SharedService } from '../services/shared.service';
import { DataService } from '../services/data-service';
import { CodeGenerationService } from '../services/code-generation.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AddNEditComponent } from '../forms/add-nedit/add-nedit.component';
import { GeneratedCodeComponent } from '../generated-code/generated-code.component';
import { UploadConfigComponent } from '../upload-config/upload-config.component';

@Component({
  selector: 'app-gesture-config',
  templateUrl: './gesture-config.component.html',
})
export class GestureConfigComponent implements OnInit {
  dataSet: { [index: string]: any } = [];
  filteredGestureList: Array<{
    gestureString: string;
    swipe: number;
    direction: string;
    action: string;
    mode: number;
    appName: string;
    gestureName: string;
  }> = [];

  gestureList: Array<{
    gestureString: string;
    swipe: number;
    direction: string;
    action: string;
    mode: number;
    appName: string;
    gestureName: string;
  }> = [];

  appNamesList: Array<{
    title: string;
    value: string;
  }> = [];

  actionsList: Array<{
    title: string;
    action: string;
  }> = [];

  searchQuery: string = '';
  gestureType: number = 0;
  displayForm: string = 'add';
  selectedGesture: any;
  id!: number;
  formOpen: boolean = false;
  modalRef;

  constructor(
    private dataService: DataService,
    private service: SharedService,
    private codeGenerationService: CodeGenerationService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.actionsList = this.dataService.actionData;
    this.appNamesList = this.dataService.appNameData;
    this.gestureList = this.dataService.gestureData;
    this.filteredGestureList = this.gestureList;

    const data = {
      gestureList: this.gestureList,
      actionsList: this.actionsList,
      appNamesList: this.appNamesList,
    };
    this.service.configEvent.next(data);
  }

  openUploadConfigModal() {
    const initailConfig = {
      class: 'modal-sm modal-center',
      initialState: {
        onUpload: (data) => this.uploadConfig(data),
      },
    };

    this.modalService.show(UploadConfigComponent, initailConfig);
  }

  uploadConfig(uploadedConfig: any) {
    this.gestureList = uploadedConfig.gestureList;
    this.filteredGestureList = this.gestureList;
    this.actionsList = uploadedConfig.actionList;
    this.appNamesList = uploadedConfig.appList;
  }

  getGeneraredCode() {
    const response = this.codeGenerationService.generatePythonCode(
      this.gestureList
    );

    const data = {
      gestureList: this.gestureList,
      actionsList: this.actionsList,
      appNamesList: this.appNamesList,
    };
    this.service.codeGenEvent.next(response);
    this.service.configEvent.next(data);
    const initialConfig = {
      class: 'modal-lg modal-center',
    };
    this.modalService.show(GeneratedCodeComponent, initialConfig);
  }

  doesExist(newGestureMapping: any) {
    return this.gestureList.some(
      (g) =>
        g.appName == newGestureMapping.appName &&
        g.mode == newGestureMapping.mode &&
        g.gestureString == newGestureMapping.gestureString
    );
  }

  addGestureMapping(newGestureMapping: any, newData) {
    if (!this.doesExist(newGestureMapping)) {
      this.gestureList.unshift(newGestureMapping);
    }
    if (newData.action) {
      this.actionsList.push(newData.action);
    }
    if (newData.app) {
      this.appNamesList.push(newData.app);
    }
  }

  openAddGestureModal() {
    const config: ModalOptions = {
      class: 'modal-lg',
      initialState: {
        appNamesList: this.appNamesList,
        actionsList: this.actionsList,
        onSave: (mapping, newData) => this.addGestureMapping(mapping, newData),
      },
    };
    this.modalService.show(AddNEditComponent, config);
  }

  editGestureMapping(gesture: any, index: number) {
    const config: ModalOptions = {
      class: 'modal-lg',
      initialState: {
        gestureMapping: gesture,
        appNamesList: this.appNamesList,
        actionsList: this.actionsList,
        onSave: (mapping, newData) => {
          this.updateGestureMapping(mapping);
        },
      },
    };
    this.modalService.show(AddNEditComponent, config);
  }

  updateGestureMapping(gesture: any) {
    this.gestureList[this.id] = gesture;
  }

  openDeleteModal(template: TemplateRef<any>, index: number) {
    this.selectedGesture = this.gestureList[index];
    const modalConfig: ModalOptions = {
      class: 'modal-center modal-sm',
    };
    this.modalRef = this.modalService.show(template, modalConfig);
  }

  deleteGesture(index) {
    this.gestureList.splice(index, 1);
    this.filteredGestureList = this.gestureList;
    this.closeDeleteModal();
  }

  closeDeleteModal() {
    this.selectedGesture = undefined;
    this.modalRef.hide();
  }

  //rename this, its for filtering the dt based on search term
  getMatchingGestures(): void {
    this.filteredGestureList = [];
    let reg = new RegExp(this.searchQuery, 'i');
    this.gestureList.forEach((gesture) => {
      if (
        gesture.gestureName.match(reg) != null ||
        gesture.appName.match(reg) != null
      ) {
        this.filteredGestureList.push(gesture);
      }
    });
  }

  //delete later
  getOpenedFingers(gestureString: string) {
    let result = '';
    let fingers = ['Thumb', 'Index', 'Middle', 'Ring', 'Little'];
    if (gestureString.length == 5) {
      for (let index = 0; index < 5; index++) {
        if (+gestureString[index]) {
          result += fingers[index] + ' | ';
        }
      }
    } else {
      let fingers = ['Thumb', 'Index', 'Middle', 'Ring', 'Little'];
      for (let index = 0; index < 5; index++) {
        if (+gestureString[index]) {
          result += fingers[index] + ' | ';
        }
      }
      result += ';';
      for (let index = 6; index < 12; index++) {
        if (+gestureString[index]) {
          result += fingers[index - 6] + ' | ';
        }
      }
    }
    return result;
  }
}
