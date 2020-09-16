import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//Paginas
import { HomePage } from '../home/home';
import {UsuarioProvider} from "../../providers/usuario/usuario";
import {URL_SERVICIOS} from "../../config/config.mongodb";

@Component({
  selector: 'page-turismo',
  templateUrl: 'turismo.html',
})
export class TurismoPage {

    markers: any[] = [];
    status: boolean = true;
    style: string = "";

  constructor(	public navCtrl: NavController, 
  				public navParams: NavParams,
                private _up:UsuarioProvider) {
      this.style= "styleParrafoTurismo";
  }




  ionViewDidLoad(){

    const url = URL_SERVICIOS + '/imagenes/marcador/';

    console.log(url);

      this._up.getAllSitios().subscribe((resp)=>{
            let description = null;

          for (let i = 0; i < resp.marcadores.length; i++){
              if (resp.marcadores[i].icono === 'turismo.png'){
                  if (resp.marcadores[i].descripcion === undefined || resp.marcadores[i].descripcion === null){
                      description = 'Sin descripcion ...';
                      this.markers.push(({lat: resp.marcadores[i].lat, lng: resp.marcadores[i].lng, label: resp.marcadores[i].nombre, descripcion: description, img: [url + resp.marcadores[i].img1, url + resp.marcadores[i].img2, url + resp.marcadores[i].img3, url + resp.marcadores[i].img4]}));
                  }else {
                      description = resp.marcadores[i].descripcion;
                      this.markers.push(({lat: resp.marcadores[i].lat, lng: resp.marcadores[i].lng, label: resp.marcadores[i].nombre, descripcion: description, img: [url + resp.marcadores[i].img1, url + resp.marcadores[i].img2, url + resp.marcadores[i].img3, url + resp.marcadores[i].img4]}));
                  }

                  console.log(this.markers);
              }
          }

      }, (eror) =>{
          
      })
  }


  verMas(){

      if (this.status){
        this.style = "styleParrafoTurismoVerMas";
        this.status = false;
        return;
      }else {
          this.style = "styleParrafoTurismo";
          this.status = true;
          return;
      }

  }



  home(){
  	this.navCtrl.setRoot(HomePage);
  }



}
