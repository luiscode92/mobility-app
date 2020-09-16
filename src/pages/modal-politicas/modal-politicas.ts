import {Component, ViewChild} from '@angular/core';
import {Content, NavController, NavParams, ViewController} from 'ionic-angular';

//@IonicPage()
@Component({
  selector: 'page-modal-politicas',
  templateUrl: 'modal-politicas.html'
})

export class ModalPoliticasPage {

    @ViewChild (Content)
    content: Content;


    activeButton: boolean = false;

    ionViewDidEnter() {
        this.content.ionScrollEnd.subscribe((data)=>{

            let dimensions = this.content.getContentDimensions();

            let scrollTop = this.content.scrollTop;
            let contentHeight = dimensions.contentHeight;
            let scrollHeight = dimensions.scrollHeight;

            if ( (scrollTop + contentHeight + 20) > scrollHeight) {
                this.activeButton = true;
            }

        });
    }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController) {
  }

  closeModal(){
      this.viewCtrl.dismiss({dataAcept : false });
  }

  aceptTerminos(){
      this.viewCtrl.dismiss({dataAcept : true })
  }





}
