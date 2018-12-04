import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from "@angular/common"
import { SelectDropDownModule } from 'ngx-select-dropdown'


import { MapComponent } from './map.component';
import { MapRoutingModule } from './map-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MapRoutingModule,
    SelectDropDownModule,
    AgmCoreModule.forRoot({
      apiKey : "AIzaSyCBG-VQjo_MW2Giwrar-gmkgULSxk-D84g"
    })
  ],
  declarations: [ MapComponent ]
})
export class MapModule { }
