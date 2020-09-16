import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {URL_RUTAS, URL_SERVICIOS} from "../../config/config.mongodb";


@Component({
  selector: 'page-modal-rutas',
  templateUrl: 'modal-rutas.html',
})
export class ModalRutasPage {

    styles = [
        {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        }
    ];

    dir = undefined;
    urlRoutes: string = "";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController,) {


      this.dir = this.navParams.get('ruta');

      if (this.dir){
          this.urlRoutes = "https://www.jectapp.com/rutas/" + this.dir.nombre + ".kml";
          //this.urlRoutes = "https://encuestareporte.000webhostapp.com/rutas/" + this.dir.nombre + ".kml";
          console.log(this.urlRoutes);
      }

  }

  ionViewDidLoad() {

  }

}
