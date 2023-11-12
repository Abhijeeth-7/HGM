import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-n-edit',
  templateUrl: './add-nedit.component.html',
})
export class AddNEditComponent implements OnInit {
  hotKeysList: Array<string> = [
    '!',
    '"',
    '#',
    '$',
    '%',
    '&',
    "'",
    '(',
    ')',
    '*',
    '+',
    ',',
    '-',
    '.',
    '/',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    ':',
    ';',
    '<',
    '=',
    '>',
    '?',
    '@',
    '[',
    '\\',
    ']',
    '^',
    '_',
    '`',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    '{',
    '|',
    '}',
    '~',
    'accept',
    'add',
    'alt',
    'altleft',
    'altright',
    'apps',
    'backspace',
    'browserback',
    'browserfavorites',
    'browserforward',
    'browserhome',
    'browserrefresh',
    'browsersearch',
    'browserstop',
    'capslock',
    'clear',
    'convert',
    'ctrl',
    'ctrlleft',
    'ctrlright',
    'decimal',
    'del',
    'delete',
    'divide',
    'down',
    'end',
    'enter',
    'esc',
    'escape',
    'execute',
    'f1',
    'f10',
    'f11',
    'f12',
    'f13',
    'f14',
    'f15',
    'f16',
    'f17',
    'f18',
    'f19',
    'f2',
    'f20',
    'f21',
    'f22',
    'f23',
    'f24',
    'f3',
    'f4',
    'f5',
    'f6',
    'f7',
    'f8',
    'f9',
    'final',
    'fn',
    'help',
    'home',
    'insert',
    'launchapp1',
    'launchapp2',
    'launchmail',
    'launchmediaselect',
    'left',
    'modechange',
    'multiply',
    'nexttrack',
    'nonconvert',
    'num0',
    'num1',
    'num2',
    'num3',
    'num4',
    'num5',
    'num6',
    'num7',
    'num8',
    'num9',
    'numlock',
    'pagedown',
    'pageup',
    'pause',
    'pgdn',
    'pgup',
    'playpause',
    'prevtrack',
    'print',
    'printscreen',
    'prntscrn',
    'prtsc',
    'prtscr',
    'return',
    'right',
    'scrolllock',
    'select',
    'separator',
    'shift',
    'shiftleft',
    'shiftright',
    'sleep',
    'space',
    'stop',
    'subtract',
    'tab',
    'up',
    'volumedown',
    'volumemute',
    'volumeup',
    'win',
    'winleft',
    'winright',
    'yen',
    'command',
    'option',
    'optionleft',
    'optionright',
  ];
  dropdownSettings: IDropdownSettings = {};
  onSave: any;
  gestureMappingForm: FormGroup;

  actionsList: any;
  appNamesList: any;

  gestureId: number;
  gestureMapping: any;
  actions!: any[];
  apps!: any[];
  fingerStates: boolean[];
  showSwipeGesture = false;
  gestureString: any;
  customAction: string;
  customAppName: any;
  selectedHotKeys: string[] = [];

  constructor(private modalRef: BsModalRef) {
    this.dropdownSettings = {
      singleSelection: false,
      itemsShowLimit: 4,
      enableCheckAll: false,
      allowSearchFilter: true,
    };
  }

  ngOnInit(): void {
    this.showSwipeGesture = this.gestureMapping
      ? this.gestureMapping.swipe
      : true;
    this.setUpGestureMappingForm(this.gestureMapping);
  }

  ngDoCheck() {
    try {
      if (this.showSwipeGesture) {
        this.fingerStates = this.decodeGestureString(this.getGestureString());
      } else {
        this.fingerStates = this.decodeGestureString(
          this.getGestureString('i')
        );
        this.decodeGestureString(this.getGestureString('f')).forEach(
          (value) => {
            this.fingerStates.push(value);
          }
        );
      }
    } catch (exception) {}
  }

  setUpGestureMappingForm(gestureMapping) {
    const fingerStates = this.decodeGestureString(
      gestureMapping?.gestureString
    );
    this.gestureMappingForm = new FormGroup({
      thumb: new FormControl(fingerStates[0]),
      index: new FormControl(fingerStates[1]),
      middle: new FormControl(fingerStates[2]),
      ring: new FormControl(fingerStates[3]),
      little: new FormControl(fingerStates[4]),

      ithumb: new FormControl(fingerStates[0]),
      iindex: new FormControl(fingerStates[1]),
      imiddle: new FormControl(fingerStates[2]),
      iring: new FormControl(fingerStates[3]),
      ilittle: new FormControl(fingerStates[4]),

      fthumb: new FormControl(fingerStates[5]),
      findex: new FormControl(fingerStates[6]),
      fmiddle: new FormControl(fingerStates[7]),
      fring: new FormControl(fingerStates[8]),
      flittle: new FormControl(fingerStates[9]),

      mode: new FormControl(gestureMapping ? gestureMapping.mode : ''),
      swipe: new FormControl(gestureMapping ? gestureMapping.direction : '', [
        Validators.required,
      ]),
      action: new FormControl(gestureMapping ? gestureMapping.action : '', [
        Validators.required,
      ]),
      customAction: new FormControl(
        gestureMapping ? gestureMapping.action : '',
        [Validators.required]
      ),
      appName: new FormControl(gestureMapping ? gestureMapping.appName : '', [
        Validators.required,
      ]),
      name: new FormControl(gestureMapping ? gestureMapping.gestureName : '', [
        Validators.required,
      ]),
    });
  }

  getHotKeyString() {
    let hotKeyString = '';
    this.gestureMappingForm.controls.gestureMappingForm.value.forEach(
      (hotkey) => {
        hotKeyString += "'" + hotkey + "'+";
      }
    );
    return hotKeyString.slice(0, hotKeyString.length - 1);
  }

  getFingerState(finger: string) {
    return this.gestureMappingForm.controls[finger].value ? 'Opened' : 'Closed';
  }

  submitForm() {
    if (this.validate(this.gestureMappingForm)) {
      this.submitGestureMapping();
    }
  }

  validate(form: FormGroup): boolean {
    if (this.showSwipeGesture && this.getGestureString() == '00000') {
      return false;
    }
    if (
      !this.showSwipeGesture &&
      this.getGestureString('i') == this.getGestureString('f')
    ) {
      return false;
    }
    if (form.controls.action.value == null && form.controls.action.touched) {
      return false;
    }
    if (form.controls.appName.value == null && form.controls.action.touched) {
      return false;
    }
    return true;
  }

  getGestureString(prefix: string = ''): string {
    let fingers = ['thumb', 'index', 'middle', 'ring', 'little'];
    let result: string = '';
    fingers.forEach((finger) => {
      result += this.gestureMappingForm.controls[prefix + finger].value
        ? '1'
        : '0';
    });
    return result;
  }

  decodeGestureString(gestureString: string): boolean[] {
    if (gestureString) {
      return gestureString
        .replace(',', '')
        .split('')
        .map((fs) => !!+fs);
    }
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((d) => false);
  }

  submitGestureMapping(): any {
    if (this.gestureMappingForm.valid) {
      const gestureMapping: any = {};
      const gestureFormValue = this.gestureMappingForm.value;
      gestureMapping.swipe = gestureFormValue.swipe !== null;
      gestureMapping.direction = gestureFormValue.swipe || 'None';

      gestureMapping.gestureString = this.showSwipeGesture
        ? this.getGestureString()
        : this.getGestureString('i') + ',' + this.getGestureString('f');

      gestureMapping.action = this.isCustomActionSelected
        ? this.getHotKeyString()
        : gestureFormValue.action;

      gestureMapping.appName = this.isCustomAppNameSelected
        ? this.customAppName
        : gestureFormValue.appName;

      if (gestureFormValue.appName.toLowerCase() == 'all applications') {
        gestureMapping.mode = 5;
      } else if (gestureFormValue.appName.toLowerCase() == 'mouse') {
        gestureMapping.mode = 1;
      } else if (this.showSwipeGesture) {
        gestureMapping.mode = gestureMapping.swipe ? 2 : 3;
      } else {
        gestureMapping.mode = 4;
      }

      gestureMapping.gestureName = gestureFormValue.name;

      //Adding newly added option data, if any
      const newData = {
        action: {},
        app: {},
      };
      if (this.isCustomActionSelected) {
        newData.action['title'] = this.getHotKeyString();
        newData.action['value'] = this.getHotKeyString();
      }
      if (this.isCustomAppNameSelected) {
        newData.app['title'] = this.customAppName;
        newData.app['value'] = this.customAppName;
      }

      this.onSave(gestureMapping, newData);
      this.closeModal();
    }
  }

  get isCustomActionSelected() {
    return +this.gestureMappingForm?.get('action').value == 1;
  }

  get isCustomAppNameSelected() {
    return +this.gestureMappingForm?.get('appName').value === 1;
  }

  closeModal() {
    this.modalRef.hide();
  }
}
