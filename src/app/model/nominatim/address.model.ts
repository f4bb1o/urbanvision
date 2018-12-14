import { post } from "selenium-webdriver/http";

export class Address {

    building: string;
    road: string;
    suburb: string;
    city: string;
    county: string;
    state: string;
    postcode: string;
    country: string;
    country_code: string;

    constructor(building: string,
    road: string,
    suburb: string,
    city: string,
    county: string,
    state: string,
    postcode: string,
    country: string,
    country_code: string){
        this.building = building;
        this.road = road;
        this.suburb = suburb;
        this.city = city;
        this.county = county;
        this.state = state;
        this.postcode = postcode;
        this.country = country;
        this.country_code = country_code;
    }
}