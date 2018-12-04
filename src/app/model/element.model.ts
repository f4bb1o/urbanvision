import { Service } from "./service.model";

export class Element {
    public area : string;
    public name : string;
    public lat : number;
    public lng : number;
    public services : string[];

    constructor(area:string,name:string,lat:number,lng:number,services:string[]){
        this.area = area;
        this.name = name;
        this.lat = lat;
        this.lng = lng;
        this.services = services;
    };
}