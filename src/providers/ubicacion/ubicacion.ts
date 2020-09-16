import { Injectable } from '@angular/core';
import {Geolocation, GeolocationOptions, Geoposition} from '@ionic-native/geolocation';


@Injectable()
export class UbicacionProvider {

	user:string = null;
	private watch:any;

	lat:number = null;
	lng:number = null;

	position:any = {};

    options : GeolocationOptions;
    currentPos : Geoposition;

  constructor(	private geolocation:Geolocation) {

  	}

  iniciarLocalizacion(){

      this.options = {
          enableHighAccuracy : true
      };

      return this.geolocation.getCurrentPosition(this.options)
          .then((pos : Geoposition) => {

              this.position = pos;
              return this.position;

      },(err : PositionError)=>{
          alert("error : " + err.message);
      });
  }

  detenerLocalizacion(){
  	this.watch.unsubscribe();
  }

}
