import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';

//Paginas
import { RegistroPage } from '../registro/registro';
import { OlvidoPassPage } from '../olvido-pass/olvido-pass';
import { HomePage } from '../home/home';

import { Facebook } from "@ionic-native/facebook";
import firebase from 'firebase';
import { GooglePlus } from "@ionic-native/google-plus";

//Servicio Usuario
import { UsuarioProvider } from '../../providers/usuario/usuario';

//Modelo
import {Usuario} from '../../models/usuario.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {errorObject} from "rxjs/util/errorObject";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

    usuario: Usuario[] = [];

    email: string = "";
    password: string = "";
    homePage = HomePage;

    loading;

  constructor(	public navCtrl: NavController, 
  				public navParams: NavParams,
                private usuarioProvider:UsuarioProvider,
                private toastCtrl:ToastController,
                public facebook: Facebook,
                public googlePlus: GooglePlus,
                private loadingCtrl: LoadingController,
                private alertCtrl: AlertController ) {
  }

    ingresar() {

      this.presentLoadingCustom();

      let newUsuario = new Usuario(null, this.email, this.password);

      this.usuarioProvider.login(newUsuario).subscribe((resp)=>{
          this.dismissLoadingCustom();
          this.navCtrl.setRoot(HomePage);
          this.usuarioProvider.cargarStorage();
      }, (error)=>{
          this.dismissLoadingCustom();
          this.presentAlert();
      });

    }

    crearCuenta() {
        this.navCtrl.push(RegistroPage);
    }

    resetPass() {
        this.navCtrl.push(OlvidoPassPage);
    }

    fbLogin(){
      this.facebook.login(['email']).then(res=>{
          const fc = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
          firebase.auth().signInWithCredential(fc).then(fs =>{
              this.usuarioProvider.isLogin = 'true';
              this.usuarioProvider.showTutorial = 'false';
              this.usuarioProvider.user.nombre = fs.displayName;
              this.usuarioProvider.user.email = fs.email;
              this.usuarioProvider.user.password = null;
              this.usuarioProvider.user.img = fs.providerData[0].photoURL + '?type=large';
              this.usuarioProvider.user._id = fs.providerData[0].uid;
              this.usuarioProvider.guardarStorage();
              this.usuarioProvider.cargarStorage();

              this.navCtrl.setRoot(HomePage);

          })

      }).catch(err=>{
            alert(JSON.stringify(err));
      });
    }

    googlePlusLogin(){
        this.googlePlus.login({
            'webClientId':'115230079984-fc8ro6rv29p2dnu8uehe2nnku4qqoiik.apps.googleusercontent.com',
            'offline': false
        }).then(res=>{
            firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
                .then(success=>{
                    this.usuarioProvider.isLogin = 'true';
                    this.usuarioProvider.showTutorial = 'false';
                    this.usuarioProvider.user.nombre = success.displayName;
                    this.usuarioProvider.user.email = success.email;
                    this.usuarioProvider.user.password = null;
                    this.usuarioProvider.user.img = success.providerData[0].photoURL;
                    this.usuarioProvider.user._id = success.providerData[0].uid;
                    this.usuarioProvider.guardarStorage();
                    this.usuarioProvider.cargarStorage();

                    this.navCtrl.setRoot(HomePage);

                    /*let newUsuario = new Usuario(this.usuarioProvider.user.nombre, this.usuarioProvider.user.email, null, null, null, true);

                    this.usuarioProvider.createUser(newUsuario).subscribe((resp => {


                    }), (error)=>{
                        alert(error.error.errors.message);
                    });*/

                }).catch(ns=>{
                    alert("Not Successfull " + JSON.stringify(ns));
            })
        }).catch(error=>{
            alert(JSON.stringify(error));
        })
    }

    presentLoadingCustom() {
        this.loading = this.loadingCtrl.create({
            content: 'Iniciando sesión, por favor espere ...'
        });

        this.loading.present();
    }

    dismissLoadingCustom(){
        this.loading.dismiss();
    }

    presentAlert() {
        let alert = this.alertCtrl.create({
            title: 'Error al iniciar sesión',
            subTitle: 'Tus crendenciales no son correctas.',
            buttons: ['Aceptar']
        });
        alert.present();
    }
}


