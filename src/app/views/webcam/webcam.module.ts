import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common"


import { WebcamComponent } from './webcam.component';
import { WebcamRoutingModule } from './webcam-routing.module';

@NgModule({
  imports: [
    CommonModule,
    WebcamRoutingModule
  ],
  declarations: [ WebcamComponent ]
})
export class WebcamModule { }