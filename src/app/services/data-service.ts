import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  actionData = [
    {
      action: `mouseUp(button='right')`,
      title: `HOLD Right Mouse-Button`,
    },
    {
      action: `hotkey('win','prntscrn')`,
      title: `SCREENSHOT`,
    },
    {
      action: `hotkey('ctr', 'esc')`,
      title: `Ctrl+Esc`,
    },
    {
      action: `press('enter')`,
      title: `PRESS Enter  Key`,
    },
    {
      action: `press('f1')`,
      title: `PRESS F1 Key`,
    },
    {
      action: `press('esc')`,
      title: `PRESS Esc Key`,
    },
    {
      action: `press('tab')`,
      title: `PRESS Tab Key`,
    },
    {
      action: `keyDown('alt')`,
      title: `HOLD Left-Alt key`,
    },
    {
      action: `keyUp('alt')`,
      title: `RELEASE Left-Alt key`,
    },
    {
      action: `hotkey('ctrl', 'c')`,
      title: `COPY`,
    },
    {
      action: `hotkey('ctrl', 'v')`,
      title: `PASTE`,
    },
    {
      action: `press('left')`,
      title: `PRESS Left Arrow Key`,
    },
    {
      action: `press('right')`,
      title: `PRESS Right Arrow Key`,
    },
    {
      action: `press('up')`,
      title: `PRESS Up Arrow Key`,
    },
    {
      action: `press('down')`,
      title: `PRESS Down Arrow Key`,
    },
    {
      action: `doubleClick()`,
      title: `MOUSE Double-Click`,
    },
    {
      action: `click(button='right') `,
      title: `MOUSE Right-Click`,
    },
    {
      action: `click() `,
      title: `MOUSE Left-Click`,
    },
    {
      action: `scroll(150)`,
      title: `MOUSE Scroll Up`,
    },
    {
      action: `scroll(-150)`,
      title: `MOUSE Scroll Down`,
    },
    {
      action: `hscroll(-80)`,
      title: `MOUSE Scroll Left`,
    },
    {
      action: `hscroll(80)`,
      title: `MOUSE Scroll Right`,
    },
    {
      action: `mouseDown()`,
      title: `HOLD Left Mouse-Button`,
    },
    {
      action: `mouseUp()`,
      title: `RELEASE Left Mouse-Button`,
    },
    {
      action: `press('Space')`,
      title: `PRESS Space Key`,
    },
    {
      action: `hotkey('ctrl','up')`,
      title: `HK ctrl-up`,
    },
    {
      action: `hotkey('ctrl','down')`,
      title: `HK ctrl-down`,
    },
    {
      action: `hotkey('ctrl','left')`,
      title: `HK ctrl-left`,
    },
    {
      action: `hotkey('ctrl','right')`,
      title: `HK ctrl-right`,
    },
    {
      action: `hotkey('ctrl','shift' ,'tab')`,
      title: `HK ctrl-shift-tab`,
    },
    {
      action: `hotkey('ctrl', 'tab')`,
      title: `HK ctrl-tab`,
    },
    {
      action: `hotkey('alt', 'left')`,
      title: `HK alt-leftArrow`,
    },
    {
      action: `hotkey('alt', 'right')`,
      title: `HK alt-rightArrow`,
    },
    {
      action: `mouseDown(button='right')`,
      title: `RELEASE Right Mouse-Button`,
    },
  ];

  appNameData = [
    {
      title: 'MICROSOFT ONE NOTE',
      value: 'OneNoteM.exe',
    },
    {
      title: 'MICROSOFT POWERPOINT',
      value: 'Powerpnt.exe',
    },
    {
      title: 'CHROME',
      value: 'chrome.exe',
    },
    {
      title: 'MICROSOFT EDGE',
      value: 'MicrosoftEdge.exe',
    },
    {
      title: 'NOTEPAD++',
      value: 'notepad++.exe',
    },
    {
      title: 'VLC Media Player',
      value: 'vlc.exe',
    },
    {
      title: 'FILE EXPLORER',
      value: 'explorer.exe',
    },
    {
      title: 'MICROSOFT WORD',
      value: 'winword.exe',
    },
    {
      title: 'TASK MANAGER',
      value: 'Taskmgr.exe',
    },
    {
      title: 'MICROSOFT ONE DRIVE',
      value: 'OneDrive.exe',
    },
    {
      title: 'All Applications',
      value: 'All',
    },
    {
      title: 'Mouse',
      value: 'Mouse',
    },
  ];

  gestureData = [
    {
      action: 'Mouse Left-Click',
      appName: 'Mouse',
      direction: 'None',
      gestureName: 'mouse left click',
      gestureString: '11001,10001',
      id: 1,
      mode: 1,
      swipe: 0,
    },
    {
      action: 'Mouse Right-Click',
      appName: 'Mouse',
      direction: 'None',
      gestureName: 'mouse right button click & hold',
      gestureString: '11001,11000',
      id: 3,
      mode: 1,
      swipe: 0,
    },
    {
      action: 'MOUSE Double-Click',
      appName: 'Mouse',
      direction: 'None',
      gestureName: 'mouse Double Click',
      gestureString: '11001,10000',
      id: 5,
      mode: 1,
      swipe: 0,
    },
    {
      action: 'MOUSE Scroll Up',
      appName: 'CHROME',
      direction: 'Up',
      gestureName: 'Chrome Scroll up',
      gestureString: '01000',
      id: 6,
      mode: 2,
      swipe: 1,
    },
    {
      action: 'MOUSE Scroll Down',
      appName: 'CHROME',
      direction: 'Down',
      gestureName: 'Chrome Scroll Down',
      gestureString: '01000',
      id: 7,
      mode: 2,
      swipe: 1,
    },
    {
      action: 'HK ctrl-shift-tab',
      appName: 'CHROME',
      direction: 'Left',
      gestureName: 'Chrome Goto Previous Tab ',
      gestureString: '01100',
      id: 10,
      mode: 2,
      swipe: 1,
    },
    {
      action: 'HK ctrl-tab',
      appName: 'CHROME',
      direction: 'Right',
      gestureName: 'Chrome Goto Next Tab',
      gestureString: '01100',
      id: 11,
      mode: 2,
      swipe: 1,
    },
    {
      action: 'HK alt-leftArrow',
      appName: 'CHROME',
      direction: 'Left',
      gestureName: 'Chrome Goto Previous Page',
      gestureString: '01110',
      id: 12,
      mode: 2,
      swipe: 1,
    },
    {
      action: 'HK alt-RightArrow',
      appName: 'CHROME',
      direction: 'Right',
      gestureName: 'Chrome Goto Next Page',
      gestureString: '01110',
      id: 13,
      mode: 2,
      swipe: 1,
    },
    {
      action: 'SCREENSHOT',
      appName: 'All Applications',
      direction: 'None',
      gestureName: 'Screenshot',
      gestureString: '11000,00000',
      id: 14,
      mode: 5,
      swipe: 0,
    },
    {
      action: 'PRESS Space Key',
      appName: 'VLC Media Player',
      direction: 'None',
      gestureName: 'VLC Play/Pause ',
      gestureString: '11111',
      id: 15,
      mode: 2,
      swipe: 0,
    },
    {
      action: 'HK ctrl-up',
      appName: 'VLC Media Player',
      direction: 'Up',
      gestureName: 'VLC Voulme Up',
      gestureString: '01000',
      id: 16,
      mode: 2,
      swipe: 1,
    },
    {
      action: 'HK ctrl-down',
      appName: 'VLC Media Player',
      direction: 'Down',
      gestureName: 'VLC Volume Down',
      gestureString: '01000',
      id: 17,
      mode: 2,
      swipe: 1,
    },
    {
      action: 'HK ctrl-left',
      appName: 'VLC Media Player',
      direction: 'Left',
      gestureName: 'VLC Rewind',
      gestureString: '01000',
      id: 18,
      mode: 2,
      swipe: 1,
    },
    {
      action: 'HK ctrl-right',
      appName: 'VLC Media Player',
      direction: 'Right',
      gestureName: 'VLC Forward',
      gestureString: '01000',
      id: 19,
      mode: 2,
      swipe: 1,
    },
  ].map((data) => {
    data.action = this.actionData.find(
      (action) => action.title.toLocaleLowerCase() == data.action.toLowerCase()
    ).action;
    return data;
  });
}
