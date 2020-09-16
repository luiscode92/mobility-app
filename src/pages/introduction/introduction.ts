import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {UsuarioProvider} from "../../providers/usuario/usuario";
import {LoginPage} from "../login/login";

//@IonicPage()
@Component({
  selector: 'page-introduction',
  templateUrl: 'introduction.html',
})
export class IntroductionPage {

    slides:any[] = [
        {
            title: "",
            description: "<h3>Es una aplicación con todas las opciones de Transporte Público Local!</h3>",
            image: "assets/recursos/bus.png",
        },
        {
            title: "¿Qué es JectApp?",
            description: "<b>JectApp</b> es una aplicación móvil y Web que simplifica la movilidad urbana, haciendo más cómodo el desplazamiento por las ciudades a través del transporte público, exponiendo los sitios más reconocidos y emblemáticos de la ciudad.",
            image: "assets/recursos/imagen2.png",
        },
        {
            title: "¿Que hace esta app?",
            description: "Esta aplicación nos ayudará a conocer el estado de tu ruta, da opiniones en tiempo real y recibe información de turismo y sitios de interés.!",
            image: "assets/recursos/ica-slidebox-img-3.png",
        }
    ];

    constructor(public navCtrl: NavController,
                private _usuario: UsuarioProvider) {
    }

    skip_tutorial(){

        this._usuario.showTutorial = 'false';
        this._usuario.guardarStorage();

        this.navCtrl.setRoot(LoginPage);
    }
}
