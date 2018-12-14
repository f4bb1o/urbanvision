import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common"
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { ModalModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap/tabs';


import { MapComponent } from './map.component';
import { MapRoutingModule } from './map-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MapRoutingModule,
    SelectDropDownModule,
    ModalModule.forRoot(),
    TabsModule.forRoot()
  ],
  declarations: [ MapComponent ]
})
export class MapModule { }
