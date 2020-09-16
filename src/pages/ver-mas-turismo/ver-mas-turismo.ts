import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//@IonicPage()
@Component({
  selector: 'page-ver-mas-turismo',
  templateUrl: 'ver-mas-turismo.html',
})
export class VerMasTurismoPage {

    markers: any[] = [];
    title: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    let arr = navParams.get('data');
    this.title = arr.label;


    this.markers.push(arr);

  }


}
