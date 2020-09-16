import { Component } from '@angular/core';
import {NavController, ModalController, AlertController, NavParams, LoadingController} from 'ionic-angular';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';

//Servicios
import { UbicacionProvider } from '../../providers/ubicacion/ubicacion';
import { UsuarioProvider } from '../../providers/usuario/usuario';

//Paginas
import { OrigenDestinoPage } from '../origen-destino/origen-destino';
import {URL_SERVICIOS} from "../../config/config.mongodb";
import {TurismoPage} from "../turismo/turismo";
import {VerMasTurismoPage} from "../ver-mas-turismo/ver-mas-turismo";
import {Diagnostic} from "@ionic-native/diagnostic";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	usuario:any={};
	position;

	location:any = {};
	lat: number = null;
	lng: number = null;

    alertPostion;

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

    markers: any[] = [];
    markersParaderos: any[] = [];
    dir = undefined;
    urlRoutes: string = "";

    loading;

  constructor(	public navCtrl: NavController,
                public navParams: NavParams,
                private _ubicacion:UbicacionProvider,
              	private _up:UsuarioProvider,
                private modalCtrl: ModalController,
                private nativeGeocoder: NativeGeocoder,
                public alertCtrl: AlertController,
                private diagnostic: Diagnostic,
                private loadingCtrl: LoadingController) {

      /*this.dir = this.navParams.get('ruta');

      if (this.dir){
          //this.urlRoutes = "https://encuestareporte.000webhostapp.com/" + this.dir.nombre + ".kml";
          this.urlRoutes = "https://encuestareporte.000webhostapp.com/rutas/TL7BT1.kml";
          console.log(this.urlRoutes);
      }*/
  }



  ionViewDidLoad(){
      this.getEnablePosition();

      //this.urlRoutes = "http://googlemaps.github.io/js-v2-samples/ggeoxml/cta.kml";


      this.presentLoadingCustom();

      this._ubicacion.iniciarLocalizacion()
          .then(resp =>{

              this.dismissLoadingCustom();

              this.lat = resp.coords.latitude;
              this.lng = resp.coords.longitude;

              
              this.nativeGeocoder.reverseGeocode(this.lat, this.lng)
                  .then((result: NativeGeocoderReverseResult) => {
                      if (result[0].subAdministrativeArea !== 'Popayán'){
                            this.showAlert('¡Servicio no disponible en tu ciudad!', 'Muy pronto JectApp estará disponible en tu ciudad.');
                      }

                  })
                  .catch((error: any) => console.log(error));

              //this.markers.push({lat : this.lat, lng: this.lng, label: 'position', description: 'Aqui estoy'});
              this.markers.push({lat : this.lat, lng: this.lng, label: 'position', description: 'Aqui estoy'});

          })
          .catch(err => {
              alert("Error: " + JSON.stringify(err));
          });

      this._up.getAllSitios().subscribe((resp) =>{

          const url = URL_SERVICIOS + '/imagenes/marcador/';

            for (let i = 0; i < resp.marcadores.length; i++){
                this.markers.push({lat: resp.marcadores[i].lat, lng: resp.marcadores[i].lng, label: resp.marcadores[i].nombre, description: resp.marcadores[i].descripcion, icon: 'assets/recursos/' + resp.marcadores[i].icono, img: [url + resp.marcadores[i].img1, url + resp.marcadores[i].img2, url + resp.marcadores[i].img3, url + resp.marcadores[i].img4]})
            }
      }, (error) =>{
          console.log(error);
      })
  }

  abrirPage(){

    let modal = this.modalCtrl.create(OrigenDestinoPage);
    modal.present();

  }

    /*mapClicked($event) {
      console.log(event);
        this.markers.push({
            lat: $event.coords.lat,
            lng: $event.coords.lng,
            label: 'A',
            description: 'Hola'
        });

        console.log(this.markers);
    }*/

    clickedMarker(label: string, index: number) {
        console.log(`clicked the marker: ${label || index}`)

    }

    markerDragEnd(m, $event: MouseEvent) {
        console.log('dragEnd', m, $event);
    }

    goToVerMas(m){
        this.navCtrl.push(VerMasTurismoPage, {data: m});
    }

    getEnablePosition(){

        this.diagnostic.isLocationEnabled().then(available => {
            if(!available){
                this.alertPostion = this.alertCtrl.create({
                    title: '¡Ubicación desactivada!',
                    subTitle: 'Por favor activa el servicio de ubicación.',
                    buttons: [
                        {
                            text: 'Aceptar',
                            handler: data => {
                                this.diagnostic.switchToLocationSettings();
                            }
                        }
                    ]});
                this.alertPostion.present();

            }
        },
            error => {
            console.log(JSON.stringify(error));
            }
        )
    }

    showAlert(title, text) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: text,
            buttons: [
                {
                    text: 'Aceptar',
                    handler: data => {
                        this.navCtrl.setRoot(TurismoPage);
                    }
                }
            ]});
        alert.present();
    }

    presentLoadingCustom() {
        this.loading = this.loadingCtrl.create({
            content: 'Cargando mapa y tu ubicación actual, por favor espera ...'
        });

        this.loading.present();
    }

    dismissLoadingCustom(){
        this.loading.dismiss();
    }

}
