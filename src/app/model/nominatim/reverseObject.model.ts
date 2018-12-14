import { Address } from "./address.model";

export class ReverseObject {
   
   place_id: string;
   licence: string;
   osm_type: string;
   osm_id: string;
   lat: string;
   lon: string;
   display_name: string;
   address: Address;
   boundingbox: string[];

   constructor(place_id: string,
   licence: string,
   osm_type: string,
   osm_id: string,
   lat: string,
   lon: string,
   display_name: string,
   address: Address,
   boundingbox: string[]){
      this.place_id = place_id;
      this.licence = licence;
      this.osm_type = osm_type;
      this.osm_id = osm_id;
      this.lat = lat;
      this.lon = lon;
      this.display_name = display_name;
      this.address = address;
      this.boundingbox = boundingbox;
   }
}