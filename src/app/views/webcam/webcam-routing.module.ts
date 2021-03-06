import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WebcamComponent } from './webcam.component';

const routes: Routes = [
  {
    path: '',
    component: WebcamComponent,
    data: {
      title: 'Webcam'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebcamRoutingModule {}