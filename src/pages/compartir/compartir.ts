import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//Paginas
import { HomePage } from '../home/home';

@Component({
  selector: 'page-compartir',
  templateUrl: 'compartir.html',
})
export class CompartirPage {

  constructor(	public navCtrl: NavController,
  				public navParams: NavParams) {
  }


  home(){
  	this.navCtrl.setRoot(HomePage);
  }
 

}
