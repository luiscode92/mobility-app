import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';


@Component({
  selector: 'page-olvido-pass',
  templateUrl: 'olvido-pass.html',
})
export class OlvidoPassPage {

	email: string;

  constructor(public navCtrl: NavController, 
  			public navParams: NavParams,
				public _usuarioService: UsuarioProvider,
				public alertCtrl: AlertController) {
  }


  recordarPass(email){
  	console.log(email);
  	this._usuarioService.rememberPass(email).subscribe(resp => {
        this.showAlert('¡Éxito!', 'Por favor revisa tu bandeja de entrada del correo !' + email + ' para restablecer tu contraseña.');
  	}, error =>{
  		this.showAlert('¡Error!', 'Correo no inválido o no registrado!');
  	})	
	}
	
	showAlert(title, text) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['Aceptar']
    });
    alert.present();
  }





}
