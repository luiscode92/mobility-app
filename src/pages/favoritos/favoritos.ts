import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//Paginas
import { HomePage } from '../home/home';

@Component({
  selector: 'page-favoritos',
  templateUrl: 'favoritos.html',
})
export class FavoritosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

   home(){
  	this.navCtrl.setRoot(HomePage);
  }

}
