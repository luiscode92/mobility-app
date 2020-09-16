import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {RutasPage} from "../rutas/rutas";
import {EmpresaProvider} from "../../providers/empresa/empresa";
import {URL_SERVICIOS} from "../../config/config.mongodb";
import {HomePage} from "../home/home";

//@IonicPage()
@Component({
  selector: 'page-empresas',
  templateUrl: 'empresas.html',
})
export class EmpresasPage {

    dataEmpresa: any[] = [];
    empresaImagen: any[] = [];
    url = URL_SERVICIOS + '/imagenes/empresa/';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _empresas: EmpresaProvider) {
  }



    ionViewDidLoad() {
        this.getAllEmpresas();
    }

    goToInfo(nombre_empresa){
        this.navCtrl.push(RutasPage, {_id : nombre_empresa});
    }

    getAllEmpresas(){
        this._empresas.getAllEmpresas().subscribe(resp=>{
            
            for (let i = 0; i < resp.empresas.length; i++){
                if (resp.empresas[i].tipo === 'TRANSPORT'){

                    this.dataEmpresa.push({ lat: resp.empresas[i].lat,
                                            lng: resp.empresas[i].lng,
                                            nombre: resp.empresas[i].nombre,
                                            informacion: resp.empresas[i].informacion,
                                            imagen: "assets/recursos/empresas/" + i + ".jpg"

                    });
                }
            }
            console.log(this.dataEmpresa);
        }, (error =>{
            console.log(error);
        }));
    }

    home(){
        this.navCtrl.setRoot(HomePage);
    }

    cambioColorRuta(empresa){
        switch (empresa){
            case 'Sotracauca Mettro':
                return 'danger';
            case 'Rápido Tambo':
                return 'secondary';
            case 'Transpubenza':
                return 'primary';
            case 'Translibertad LTDA':
                return 'advertence';
        }
    }

}
