import { Component, OnInit } from '@angular/core';
import { Element } from '../../model/element.model';
import { Service } from '../../model/service.model';
import { JsonApiService } from "../../services/json-api.service"
import { HttpClient } from '@angular/common/http';


declare var ol: any;
export interface Point {
  lat : number;
  lon : number;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})



export class MapComponent implements OnInit {

  points : Point[] = [];
  arrayElements : any[];
  arrayServices : any[];
  arrayArea : any[];
  map: any;
  latitude: number = 45.438158;
  longitude: number = 10.993742;
  markerSource = new ol.source.Vector();
  disabled = true;
  currentArea;
  currentLayers : any = Array();
  styles = new Map();



  config = {
    displayKey : "description", //if objects array passed which key to be displayed defaults to description,
    search:true, //enables the search plugin to search in the list
    limitTo:10
  }

  stylePalo = new ol.style.Style({
    image: new ol.style.Icon(({
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      //opacity: 0.75,
      scale: 0.2,
      src : 'assets/img/Marker/Palo Intelligente.png'
      // src: 'https://openlayers.org/en/latest/examples/data/icon.png'
    }))
  });
  

  styleCestino = new ol.style.Style({
    image: new ol.style.Icon(({
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      //opacity: 0.75,
      scale: 0.2,
      src : 'assets/img/Marker/Cestino.png'
      // src: 'https://openlayers.org/en/latest/examples/data/icon.png'
    }))
  });

  stylePanchina = new ol.style.Style({
    image: new ol.style.Icon(({
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      //opacity: 0.75,
      scale: 0.2,
      src : 'assets/img/Marker/Panchina.png'
      // src: 'https://openlayers.org/en/latest/examples/data/icon.png'
    }))
  });
  stylePuntiLuce = new ol.style.Style({
    image: new ol.style.Icon(({
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      //opacity: 0.75,
      scale: 0.2,
      src : 'assets/img/Marker/Punto luce.png'
      // src: 'https://openlayers.org/en/latest/examples/data/icon.png'
    }))
  });

  styleSmartBin = new ol.style.Style({
    image: new ol.style.Icon(({
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      //opacity: 0.75,
      scale: 0.2,
      src : 'assets/img/Marker/Smart bin.png'
      // src: 'https://openlayers.org/en/latest/examples/data/icon.png'
    }))
  });

  puntiLuce : Element[] = new Array();
  smartBin : Element[] = new Array();
  palo : Element[] = new Array();
  panchine : Element[] = new Array();
  cestini : Element[] = new Array();

  dropdownOptions = ['Luce','Cassonetti intelligenti','Arredo urbano'];
  dropdownElement = ['Punti Luce','Smart bin','Palo Intelligente','Panchina','Cestino'];
  dropdownService = ['WiFi','Telecamera','Monitoraggio Ambientale','Lora','Corrente','LTE/GG','GPS','Diffusione Sonora','Punto Luce'];

  dataModelOptions : any = Array();
  dataModelElement : any;
  dataModelService : any;
  




  constructor(public jsonApiService : JsonApiService) { }



  ngOnInit() {
    

    
   
   this.styles.set("Palo Intelligente",this.stylePalo);
   this.styles.set("Smart bin",this.styleSmartBin);
   this.styles.set("Panchina",this.stylePanchina);
   this.styles.set("Cestino",this.styleCestino);
   this.styles.set("Punto luce",this.stylePuntiLuce);


    


    let startMarker = new ol.Feature({
      type: 'icon',
      geometry: new ol.geom.Point(this.latitude,this.longitude)
    });


    var iconFeatures = [];

    var iconFeature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.transform([this.longitude, this.latitude], 'EPSG:4326',
        'EPSG:3857')),
      name: 'Null Island',
      population: 4000,
      rainfall: 500
    });


    //this.markerSource.addFeature(iconFeature);

    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([this.longitude, this.latitude]),
        zoom: 17
      })
    });
    // let that = this;
    // this.map.on('singleclick',function(event){
    //   var lonLat = ol.proj.toLonLat(event.coordinate);
    //   that.addMarker(lonLat[0], lonLat[1]);
    // });
  }


  addArea(values){
    this.arrayServices = [];
    console.log(values);
    switch (values[0]) {
      case "Luce":
        this.dropdownElement = ['Punti Luce','Palo Intelligente'];
        this.dataModelElement = [];
        this.dataModelService = [];
        break;
      case "Cassonetti intelligenti":
        this.dropdownElement = ['Smart bin'];
        this.dataModelElement = [];
        this.dataModelService = [];
      break;    
      case "Arredo urbano":
        this.dropdownElement = ['Cestino','Panchina'];
        this.dataModelElement = [];
        this.dataModelService = [];
      break; 
      default:
        break;
    }
  }

  addElements(values){
    this.arrayElements = values;
    
    if(this.arrayServices && this.arrayServices.length != 0){
      this.addServices(this.arrayServices);
    }else{
      this.arrayElements.forEach(element => {
        this.jsonApiService.getElements(element).subscribe((elements: Element[]) => {
          elements.forEach(jsonObject => {
            this.addMarker(jsonObject.lng,jsonObject.lat,this.styles.get(jsonObject.name));
            // let p1: Point = { lat: jsonObject.lat, lon: jsonObject.lng };
            // this.points.push(p1);
          });
        });

      });
    }
  }

  addServices(values){
    this.arrayServices = values;
    if(this.arrayServices.length == 0){
      console.log(this.arrayElements);
      this.addElements(this.arrayElements);
    }else{
      this.arrayServices.forEach(element => {
        this.jsonApiService.getElementsFromServices(element).subscribe((elements: Element[]) => {
          elements.forEach(jsonObject => {

            if(this.arrayElements.includes(jsonObject.name)){
              this.addMarker(jsonObject.lng,jsonObject.lat,this.styles.get(jsonObject.name));
            }
          });
        });

      });
    }
  }

  changeValue($event: any, area : string) {
    this.removeLayer();
    if(area == "element"){
      // this.points = [];
      this.addElements($event.value);
    }
    if(area == "service"){
      //this.addElements(this.arrayElements);
      this.addServices($event.value);

    }
    if(area == "area"){
      this.addArea($event.value);
    }

  }

  public addMarker(lon, lat , style) {
    // console.log('lon:', lon);
    // console.log('lat:', lat);
  
    var source = new ol.source.Vector();
  
    var iconFeature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.transform([lon, lat], 'EPSG:4326',
        'EPSG:3857')),
      name: 'Null Island',
      population: 4000,
      rainfall: 500
    });
    
  
    source.addFeature(iconFeature);


    var vectorLayer = new ol.layer.Vector({
          source: source,
          style: style,
    });
    vectorLayer.set("name","");
    this.map.addLayer(vectorLayer);
  }

  public removeLayer(){
    var layersToRemove = [];
    this.map.getLayers().forEach(function (layer) {
        if (layer.get('name') != undefined) {
            layersToRemove.push(layer);
        }
    });

    var len = layersToRemove.length;
    for(var i = 0; i < len; i++) {
        this.map.removeLayer(layersToRemove[i]);
    }
  }

}
