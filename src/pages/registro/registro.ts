import { Component, ViewChild } from '@angular/core';
import {
    NavController,
    NavParams,
    LoadingController,
    Loading,
    ToastController,
    AlertController,
    ModalController
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//Firebase
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

//Paginas
import { LoginPage } from '../login/login'

//Servicio Usuario
import { UsuarioProvider } from '../../providers/usuario/usuario';
import {Usuario} from "../../models/usuario.model";
import {ModalPoliticasPage} from "../modal-politicas/modal-politicas";


@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

	myForm: FormGroup;
	nombres:string = "";
	//usuario:string = "";
	email:string = "";
	clave:string = "";
  	notificacion:boolean;
  	politicas_privacidad: boolean;
  	errPoliticas: boolean = null;



    loading;

    contador: number = 0;

	

  constructor(	public navCtrl: NavController, 
  				public navParams: NavParams,
  				private afDB: AngularFireDatabase,
  				private loadingCtrl:LoadingController,
  				private alertCtrl:AlertController,
  				private toastCtrl:ToastController,
  				public formBuilder: FormBuilder,
  				private usuarioProvider:UsuarioProvider,
                public modalCtrl: ModalController) {

  	this.myForm = this.createMyForm();

  }

   saveData(){

  	this.presentLoadingCustom();

	this.nombres 		= 	this.myForm.value.nombre;
	//this.usuario 		= 	this.myForm.value.usuario;
	this.email 			= 	this.myForm.value.email;
	this.clave 			= 	this.myForm.value.password;
	this.notificacion 	= 	this.myForm.value.notificacion;
	this.politicas_privacidad = this.myForm.value.politicas;

    //this.usuario = this.usuario.toLowerCase();
    this.email = this.email.toLowerCase();
    //this.usuario = this.usuario.trim();
    //console.log(this.usuario);

    let newUsuario = new Usuario(this.nombres, this.email, this.clave, null);

    this.usuarioProvider.createUser(newUsuario).subscribe((resp => {
    	this.dismissLoadingCustom();
    	this.presentToast();
    	this.navCtrl.setRoot(LoginPage);

	}), (error)=>{
    	this.dismissLoadingCustom();
		this.presentAlert(error.error.errors.message);
    	console.log(error);
	});

  }

  /*verificaUsuario(){

  	/*this.usuario = this.myForm.value.usuario;
  	this.usuarioProvider.verifyUser(this.usuario).then((respuesta)=>{
  		if (respuesta) {
  			this.existe = true;
  		}else{
  			this.existe = false;
  		}
  	});

  }*/

  /*verificaEmail(){

	this.email = this.myForm.value.email;
  	this.usuarioProvider.verifyEmail(this.email).then((respuesta)=>{
  		if (respuesta) {
  			//Correo no disponible
  			this.existeMail = true;
  		}else{
  			//Correo disponible
  			this.existeMail = false;
  		}
  	})

  }*/

  /*borrarExiste(){
  	this.existe = false;
  }

  borrarExisteMail(){
  	this.existeMail = false;
  }*/

  private createMyForm(){
	
    return this.formBuilder.group({
	      nombre: ['', [Validators.required, Validators.minLength(6)]],
	      //usuario: ['', [Validators.required, Validators.minLength(6)]],
	      email: ['', [Validators.required, Validators.email]],
	      password: ['', [Validators.required, Validators.pattern(/^[a-z0-9_-]{6,18}$/)]],
	      notificacion:[true],
          politicas:[false, Validators.requiredTrue],
    });
  }


    presentLoadingCustom() {
        this.loading = this.loadingCtrl.create({
            content: 'Registrando tus datos, por favor espera ...'
        });

        this.loading.present();
    }

    dismissLoadingCustom(){
        this.loading.dismiss();
    }

    presentAlert(text) {
        let alert = this.alertCtrl.create({
            title: 'Error al guardar los datos',
            subTitle: text,
            buttons: ['Aceptar']
        });
        alert.present();
    }

    presentToast() {
        let toast = this.toastCtrl.create({
            message: 'Tu cuenta se ha creado correctamente.',
            duration: 3000,
            position: 'bottom'
        });


        toast.present();
    }

    modalPoliticas(ev){
      this.contador = this.contador + 1;
        if (ev._value && this.contador >= 1){
            ev._value = false;
            let profileModal = this.modalCtrl.create(ModalPoliticasPage);
            profileModal.onDidDismiss(data => {
                ev._value = data.dataAcept;
                if (ev._value){
                    this.errPoliticas = ev._value;
                }else {
                    this.errPoliticas = ev._value;
                }
            });
            profileModal.present();
        }



    }
}
