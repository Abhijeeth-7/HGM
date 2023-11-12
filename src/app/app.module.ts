import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedService } from './services/shared.service';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TutorialComponent } from './tutorial/tutorial.component';
import { GestureConfigComponent } from './gesture-config/gesture-config.component';
import { AddNEditComponent } from './forms/add-nedit/add-nedit.component';
import { GeneratedCodeComponent } from './generated-code/generated-code.component';
import { ConfigBackupComponent } from './config-backup/config-backup.component';
import { HandDrawingComponent } from './hand-drawing/hand-drawing.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UploadConfigComponent } from './upload-config/upload-config.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: GestureConfigComponent,
  },
  {
    path: 'tutorial',
    component: TutorialComponent,
  },
  {
    path: 'backup',
    component: ConfigBackupComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    TutorialComponent,
    GestureConfigComponent,
    AddNEditComponent,
    GeneratedCodeComponent,
    ConfigBackupComponent,
    UploadConfigComponent,
    HandDrawingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    NgMultiSelectDropDownModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [SharedService],
  bootstrap: [AppComponent],
})
export class AppModule {}
