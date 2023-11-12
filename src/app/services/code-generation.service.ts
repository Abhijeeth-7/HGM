import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CodeGenerationService {
  actionGestureId = 0;
  gestureData = [];
  actionData = [];
  appData = [];
  generatedScript: string = '';
  modes = [1, 2, 3, 4, 5];

  generateIFBlock(record: any) {
    let result = '';
    const [intialGestureString, finalGestureString] =
      record.gestureString.split(',');
    const action = record.action;
    if (finalGestureString) {
      const id = this.actionGestureId++;
      result = `
                    if (gestureString == '${intialGestureString}'):
                      self.actionGesture[${id}] = 1

                    elif self.actionGesture[{id}] and (gestureString == '${finalGestureString}'):

                      pyautogui.${action}
                      self.actionGesture[${id}] = 0
                      return`;
    } else {
      result = `
                    if (gestureString == '${intialGestureString}' and swipe == ${record['swipe']} and direction=='${record['direction']}'):
                        pyautogui.${action}
                        return`;
    }
    return result;
  }

  generateApplicationBlocks(records: any) {
    let result = '';
    const appNames = new Set(records.map((r) => r.appName));
    appNames.forEach((appName: string) => {
      let ifBlocks = '';
      const filteredRecords = records.filter(
        (record) => record.appName == appName
      );
      filteredRecords.forEach((fr) => {
        ifBlocks += this.generateIFBlock(fr);
      });
      if (
        ['all applications', 'mouse'].some(
          (text) => text == appName.toLocaleLowerCase()
        )
      ) {
        result += `
                if True:
                  ${ifBlocks}
                `;
      } else {
        result += `
                if ApplicationName == '${appName}':
                    ${ifBlocks}
                `;
      }
    });
    return result;
  }

  generateModeBlocks(records) {
    let result = '';
    this.modes.forEach((mode) => {
      let appBlocks = '';
      let filteredRecords = records.filter((record) => record.mode == mode);
      appBlocks += this.generateApplicationBlocks(filteredRecords);
      if (appBlocks.length) {
        result += `
            if mode == ${mode}:
                ${appBlocks}
            `;
      }
    });
    return result;
  }

  genrateScript(records: any) {
    this.generatedScript = this.generateModeBlocks(records);
    return this.boilerPlateCode;
  }

  generatePythonCode(data) {
    return this.genrateScript(data);
  }

  get boilerPlateCode() {
    return `
    import autopy
    from win32gui import GetForegroundWindow
    from win32process import GetWindowThreadProcessId
    from win32api import GetSystemMetrics
    from psutil import Process
    import cv2
    import pyautogui
    import numpy as np
    import mediapipe as mp

    class HandDetector():

        def __init__(self, mode=False,maxHands=2,detectionCon=0.9,trackcon=0.9):
            self.mode = mode
            self.maxHands = maxHands
            self.detectioncon = detectionCon
            self.trackcon = trackcon
            self.mpHands = mp.solutions.hands
            self.hands = self.mpHands.Hands(self.mode, self.maxHands, self.detectioncon, self.trackcon)
            self.mpDraw = mp.solutions.drawing_utils

        def findHands(self, img, draw = True):
            imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            self.results = self.hands.process(imgRGB)

            #draws the connections on the image, only for visual feedback doesnt affect the algorithm

            if self.results.multi_hand_landmarks:
                for handLms in self.results.multi_hand_landmarks:
                   if draw:
                       self.mpDraw.draw_landmarks(img, handLms, self.mpHands.HAND_CONNECTIONS)

            return img

        def findPosition(self, img):
            lmList = []
            bbox = [0,0,0,0]
            label = "Right"

            if self.results.multi_hand_landmarks:
                if len(self.results.multi_hand_landmarks)>1:
                    handLabel = self.results.multi_handedness[0].classification[0].label
                    hand1x = self.results.multi_hand_landmarks[0].landmark[9].x*img.shape[1]
                    hand2x = self.results.multi_hand_landmarks[1].landmark[9].x*img.shape[1]
                    if abs(hand1x - hand2x) > 50:
                        label="Left"
                        if handLabel == "Right":
                            myHand = self.results.multi_hand_landmarks[0]
                        else:
                            myHand = self.results.multi_hand_landmarks[1]
                    else:
                        if handLabel == "Left":
                            myHand = self.results.multi_hand_landmarks[0]
                        else:
                            myHand = self.results.multi_hand_landmarks[1]

                elif len(self.results.multi_hand_landmarks)==1:
                    label = "Right"
                    myHand = self.results.multi_hand_landmarks[0]

                xmax,ymax = 0,0
                xmin,ymin = 99999,99999
                for id, lm in enumerate(myHand.landmark):
                       h, w, c = img.shape
                       cx, cy = int(lm.x * w), int(lm.y * h)
                       xmin = min(xmin,cx)
                       xmax = max(xmax,cx)
                       ymin = min(ymin,cy)
                       ymax = max(ymax,cy)
                       lmList.append([id, cx, cy, label])
                       cv2.circle(img, (cx, cy), 3, (255, 0, 0), cv2.FILLED)
                bbox = [xmin,ymin,xmax,ymax]

            return lmList,bbox, label

    class Comparetor:
        prevlm = list()
        x = 0
        y = 0

        def __init__(self):
            pass

        def getGestureData(self, hlandmarks, img):
            return [self.getGestureString(hlandmarks), self.identifySwipe(hlandmarks)]

        def identifySwipe(self, hlandmarks):
            try:
                x1, y1 = self.prevlm[9][1], self.prevlm[9][2]
                x2, y2 = hlandmarks[9][1], hlandmarks[9][2]
                if abs(x2 - x1) > 5 and abs(y2 - y1) > 5:
                    self.x += x2 - x1
                    self.y += y2 - y1
                elif abs(x2 - x1) > 5:
                    self.x += x2 - x1
                elif abs(y2 - y1) > 5:
                    self.y += y2 - y1
            except:
                pass

            if abs(self.x) > 30 or abs(self.y) > 7:
                return self.direction(hlandmarks)
            elif self.getGestureString(hlandmarks) == '00000':
                self.x, self.y  = 0, 0
            return False

        def direction(self, hlandmarks):
            dir = 'NONE'
            if abs(self.x) > abs(self.y):
                if (self.x < 0):
                    dir = 'Right'
                else:
                    dir = 'Left'
                self.x = 0
            else:
                if (self.y > 0):
                    dir = 'Down'
                else:
                    dir = 'Up'
                self.y = 0
            return dir

        def getGestureString(self, hLandmarks):
            fingers = ''
            if hLandmarks[4][3] == "Left":
                if hLandmarks[4][1] < hLandmarks[3][1]:
                    fingers += '1'
                else:
                    fingers += '0'
            else:
                if hLandmarks[4][1] > hLandmarks[3][1]:
                    fingers += '1'
                else:
                    fingers += '0'
            if hLandmarks[8][2] < hLandmarks[6][2]:
                fingers += '1'
            else:
                fingers += '0'
            if hLandmarks[12][2] < hLandmarks[10][2]:
                fingers += '1'
            else:
                fingers += '0'
            if hLandmarks[16][2] < hLandmarks[14][2]:
                fingers += '1'
            else:
                fingers += '0'
            if hLandmarks[20][2] < hLandmarks[18][2]:
                fingers += '1'
            else:
                fingers += '0'
            return fingers

    class App:

        def __init__(self):
            self.cap = cv2.VideoCapture(0)
            self.wCam, self.hCam = GetSystemMetrics(0), GetSystemMetrics(1)
            self.cap.set(3, self.wCam)
            self.cap.set(4, self.hCam)

            self.frameR = 300
            self.plocX, self.plocY = 0, 0
            self.smoothening = 5
            self.detector = HandDetector()

            self.actionGesture = [0]*${this.actionGestureId}
            self.comparetor = Comparetor()
            self.mode = 0
            self.img = None

        def begin(self):
            while True:
                pid = GetWindowThreadProcessId(GetForegroundWindow())
                try:
                    ApplicationName = Process(pid[-1]).name()
                except:
                    pass

                sucess, img = self.cap.read()
                img = self.detector.findHands(img)
                self.img = img

                hlandmarks, bbox, label = self.detector.findPosition(img)

                if label == 'Left':
                    gestureString = self.comparetor.getGestureString(hlandmarks)
                    if gestureString == '11111':
                        newMode = 5
                    elif gestureString == '01111':
                        newMode = 4
                    elif gestureString == '01110':
                        newMode = 3
                    elif gestureString == '01100':
                        newMode = 2
                    elif gestureString == '01000':
                        newMode = 1
                    else:
                        newMode = 0
                    if newMode != 0:
                        self.mode = newMode
                else:
                    # generatedCode
                    self.matchConfiguredGestures(hlandmarks, ApplicationName, bbox)
                    self.comparetor.prevlm = hlandmarks

                cv2.putText(self.img, 'Mode : ' + str(self.mode), (200, 500), cv2.FONT_HERSHEY_PLAIN, 3, (255, 255, 255), 3)
                cv2.putText(self.img, "Press 'q' to exit or terminate the program", (100, 100), cv2.FONT_HERSHEY_PLAIN, 3, (0, 255, 0), 3)

                cv2.imshow("Image", img)
                if cv2.waitKey(10) & 0xFF == ord('q'):
                    break

        def matchConfiguredGestures(self,hlandmarks, ApplicationName, bbox):
            if len(hlandmarks) == 0:
                return

            gestureString, direction = self.comparetor.getGestureData(hlandmarks,self.img)
            mode = self.mode

            if direction != False:
                swipe = True
            else:
                direction = 'None'
                swipe = False

            cv2.putText(self.img, gestureString, (10, 500), cv2.FONT_HERSHEY_PLAIN, 3, (255, 255, 0), 3)
            cv2.putText(self.img, 'Mode : ' + str(mode), (200, 500), cv2.FONT_HERSHEY_PLAIN, 3, (255, 255, 0), 3)

            if mode == 1:
                if True:
                    mx1 = hlandmarks[9][1]
                    my1 = hlandmarks[9][2]
                    if (gestureString != '00000'):
                        cv2.rectangle(self.img, (self.frameR, self.frameR - 100), (self.wCam - self.frameR - 300, self.hCam - self.frameR + 20),
                                        (255, 0, 255))
                        cv2.rectangle(self.img, (bbox[0] - 20, bbox[1] - 20), (bbox[2] + 20, bbox[3] + 20), (255, 0, 255))
                        mx3 = np.interp(mx1, (self.frameR, self.wCam - self.frameR - 300), (0, self.wCam))
                        my3 = np.interp(my1, (self.frameR - 100, self.hCam - self.frameR + 20), (0, self.hCam))
                        self.clocX = self.plocX + (mx3 - self.plocX) // self.smoothening
                        self.clocY = self.plocY + (my3 - self.plocY) // self.smoothening

                        try:
                            autopy.mouse.move(self.wCam - self.clocX, self.clocY)
                            self.plocX, self.plocY = self.clocX, self.clocY
                        except:
                            pass
                    else:
                        try:
                            autopy.mouse.move(self.wCam - self.clocX, self.clocY)
                            self.plocX, self.plocY = self.clocX, self.clocY
                        except:
                            pass

            ${this.generatedScript}

    a = App()
    a.begin()
    a.cap.release()
    cv2.destroyAllWindows()
    `;
  }
}
