import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestureConfigComponent } from './gesture-config/gesture-config.component';
import { TutorialComponent } from './tutorial/tutorial.component';

const routes: Routes = [
  { path: 'tutorial', component: TutorialComponent },
  { path: 'configGestures', component: GestureConfigComponent },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 64],
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
