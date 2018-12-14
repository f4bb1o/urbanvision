import { Component, OnInit, HostListener, ElementRef, TemplateRef } from '@angular/core';
import { Element } from '../../model/element.model';
import { JsonApiService } from "../../services/json-api.service"
import { NominatimService } from '../../services/nominatim/nominatim.service';
import { ReverseObject } from '../../model/nominatim/reverseObject.model';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';


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

  modalRef: BsModalRef;
  mapServices = new Map();
  iconServices = Array();
  modalTitle : string;
  points : Point[] = [];
  arrayElements : any[];
  arrayServices : any[];
  arrayArea : any[];
  map: any;
  address : any;
  latitude: number = 45.438158;
  longitude: number = 10.993742;
  markerSource = new ol.source.Vector();
  disabled = true;
  currentArea;
  currentLayers : any = Array();
  styles = new Map();

  //-------


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

  dropdownOptions = ['Tutti','Luce','Cassonetti intelligenti','Arredo urbano'];
  dropdownElement = ['Punti Luce','Smart bin','Palo Intelligente','Panchina','Cestino'];
  dropdownElementAll = ['Punti Luce','Smart bin','Palo Intelligente','Panchina','Cestino'];

  dropdownService = ['WiFi','Telecamera','Monitoraggio ambientale','Lora','Corrente','LTE','GPS','Diffusione sonora','Punto Luce'];

  dataModelOptions : any = Array();
  dataModelElement : any;
  dataModelService : any;
  
  view : any;
  element : any;



  constructor(private modalService: BsModalService,private eRef: ElementRef, public jsonApiService : JsonApiService, public nominatim : NominatimService) { 
    this.text = 'no clicks yet';
  }

  public text: String;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(this.eRef.nativeElement.contains(event.target)) {
      this.text = "clicked inside";
      console.log(this.text);
    } else {
      this.text = "clicked outside";
      console.log(this.text);
      let that = this;

      setTimeout( function() { that.map.updateSize();}, 200);


    }
  }



  ngOnInit() {
    

  this.mapServices = new Map([
      [ "Telecamera", false ],
      [ "WiFi", false ],
      [ "Monitoraggio ambientale", false ],
      [ "Lora", false ],
      [ "Corrente", false ],
      [ "LTE", false ],
      [ "GPS", false ],
      [ "Diffusione sonora", false ],
      [ "Punto Luce", false ]

  ]);


   
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

    var gruppo_OSM = new ol.layer.Group({
      title:"Basemap",
      layers: [
        new ol.layer.Tile({
          title: 'OSM',
          metodo: 'ol.source.XYZ',
          accesso: 'anonimo',
          type: "base",
          visible: true,
          source: new ol.source.XYZ({
            url: 'http://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png ',
          })
        }),
        new ol.layer.Tile({
          title: 'Mapbox',
          metodo: 'ol.source.XYZ',
          accesso: 'anonimo',
          type: "base",
          visible: true,
          source: new ol.source.XYZ({
            url: 'https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZmFiaW9kZyIsImEiOiJjanBiY2h3a3UybTRlM2twZXY4ajZzdXJoIn0.M_xds67zQX5FPzcENCbrIg',
          })
        }),
        new ol.layer.Tile({
          title: 'Mapbox Street',
          metodo: 'ol.source.XYZ',
          accesso: 'anonimo',
          type: "base",
          visible: true,
          source: new ol.source.XYZ({
            url: 'https://api.mapbox.com/styles/v1/fabiodg/cjpdv3s2m1cp42rqkf9kqn8f4/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZmFiaW9kZyIsImEiOiJjanBiY2h3a3UybTRlM2twZXY4ajZzdXJoIn0.M_xds67zQX5FPzcENCbrIg'
            ,
          })
        })
      ]
    })
    //this.markerSource.addFeature(iconFeature);

    this.view = new ol.View({
      center: ol.proj.fromLonLat([this.longitude, this.latitude]),
      zoom: 17
    });





    var container = document.getElementById('popup');
    var content = document.getElementById('popup-content');
    var closer = document.getElementById('popup-closer');

    
    var overlay = new ol.Overlay({
      element: container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });

    
    closer.onclick = function() {
      overlay.setPosition(undefined);
      closer.blur();
      return false;
    };

    this.map = new ol.Map({
      target: 'map',
      layers: [gruppo_OSM],
      overlays: [overlay],
      view: this.view
    });


    var zoomslider = new ol.control.ZoomSlider();
    this.map.addControl(zoomslider);

    //Layers switcher
    var layerSwitcher = new ol.control.LayerSwitcher({
      tipLabel: 'layer switcher'
    });
    this.map.addControl(layerSwitcher);

    let that = this;

    window.onresize = function()
    {
      setTimeout( function() { that.map.updateSize();}, 100);
    }



  this.map.on('singleclick', function(evt) {
    var feature = that.map.forEachFeatureAtPixel(evt.pixel,
      function(feature) {
        return feature;
      });
      if (feature) {
        that.iconServices = [];

        console.log(feature);
        var prova = feature.get("custom");
        var coordinate = evt.coordinate;
        var text = "";
        var icons_text = "";
        var services = feature.get("services");
        var point = feature.getGeometry();
        var lonlat = ol.proj.transform(point.getCoordinates(), 'EPSG:3857', 'EPSG:4326');
        var lon = lonlat[0];
        var lat = lonlat[1];

        that.nominatim.getReverseGeocoding(lon,lat).subscribe((reverseObject: ReverseObject) => {
          that.address = reverseObject.address.road;
          text += "<div><b>Tipo</b> : "+feature.get("name")+"</div>";
          var str = reverseObject.display_name; 
          var splitted = str.split(",", 1); 
          text += "<div><b>Posizione</b> : "+splitted[0]+"</div>";
          
          services.forEach(element => {
            that.iconServices.push(element);
            //icons_text += '<img class="thumb" style="heigth : 25px; width : 25px;" src="../../../assets/img/servizi/'+element+'.png">&nbsp';
          });
          //text += icons_text;
        
          content.innerHTML = text;
          //content.innerHTML = prova[0];
          overlay.setPosition(coordinate);
              
         });

      }
  });
    // let that = this;
    // this.map.on('singleclick',function(event){
    //   var lonLat = ol.proj.toLonLat(event.coordinate);
    //   that.addMarker(lonLat[0], lonLat[1]);
    // });
  }


  addArea(values){
    this.arrayServices = [];
    switch (values[0]) {
      case "Tutti":
        this.dropdownElement = this.dropdownElementAll;
        this.dataModelElement = [];
        this.dataModelService = [];
        break;     
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
    var that = this
    this.arrayElements = values;
    
    if(this.arrayServices && this.arrayServices.length != 0){
      this.addServices(this.arrayServices);
    }else{
      this.arrayElements.forEach(element => {
        this.jsonApiService.getElements(element).subscribe((elements: Element[]) => {
          elements.forEach(jsonObject => {
            this.addMarker(jsonObject,this.styles.get(jsonObject.name));

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
              this.addMarker(jsonObject,this.styles.get(jsonObject.name));
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

  public addMarker(jsonObject : Element, style) {
    // console.log('lon:', lon);
    // console.log('lat:', lat);
    var source = new ol.source.Vector();
    var iconFeature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.transform([jsonObject.lng, jsonObject.lat], 'EPSG:4326',
        'EPSG:3857')),
      name: jsonObject.name,
      services : jsonObject.services
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

  onResize($event) {
    let that = this;
    setTimeout( function() { that.map.updateSize();}, 100);

  }
  
  openModal(template: TemplateRef<any>,service : string) {
    this.modalTitle = service;
    this.mapServices.set(service,true);
    this.modalRef = this.modalService.show(template);
    console.log(service);
    
    console.log(this.mapServices);
  }

  closeModal(){
    this.modalRef.hide();
    let that = this;
    this.mapServices.forEach((value: string, key: string) => {
      that.mapServices.set(key,false);
  });
  }


}
