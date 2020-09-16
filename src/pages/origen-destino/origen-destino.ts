import { Component } from '@angular/core';
import {LoadingController, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {CompleteTestService} from "../../providers/complete-test-service/complete-test-service";
import {RutasProvider} from "../../providers/rutas/rutas";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {HomePage} from "../home/home";
import {ModalRutasPage} from "../modal-rutas/modal-rutas";

@Component({
  selector: 'page-origen-destino',
  templateUrl: 'origen-destino.html',
  animations: [
        trigger('itemState', [
            state('in', style({transform: 'translateX(0)'})),
            //Enter
            transition('void => *', [
                style({
                    transform: 'translateX(-100%)'
                }),
                animate('300ms linear')
            ]),
            //Leave
            transition('* => void', animate('300ms ease-out', style({
                transform: 'translateX(100%)'
            }))),
        ])
    ]
})
export class OrigenDestinoPage {

    myForm: FormGroup;

    origen: string = "";
    destino: string = "";
    rutasFinal:any[] = [];
    rutas: any[] = [];

    animation = 'in';

    loader;

    constructor(	public navCtrl: NavController,
                    public navParams: NavParams,
                    private viewCtrl: ViewController,
                    private loadingCtrl: LoadingController,
                    public completeTestService: CompleteTestService,
                    public _rutas: RutasProvider,
                    public formBuilder: FormBuilder,
                    public modalCtrl: ModalController) {
        this.myForm = this.createMyForm();
    }

    ionViewDidLoad() {}

    private createMyForm(){

        return this.formBuilder.group({
            origen: ['', [Validators.required, Validators.minLength(6)]],
            destino: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    getAllRutas(){

        this.presentLoading();
        this.origen = this.myForm.value.origen;
        this.destino = this.myForm.value.destino;

        this.rutasFinal = [];

        this._rutas.getAllRoutes()
            .subscribe((resp: any)=> {
                let arreglo = [];
                let dataRutas = [];
                this.rutas = resp;

                for (let data of resp.rutas) {
                    arreglo.push({
                        nombre: data.nombre,
                        lat_origen: data.lat_origen,
                        lng_origen: data.lng_origen,
                        lat_destino: data.lat_destino,
                        empresa: data.empresa.nombre,
                        lng_destino: data.lng_destino,
                        barrios: (data.barrios.split(","))
                    });

                }


                for (let ruta = 0; ruta < arreglo.length; ruta++) {
                    var bandera = 0;
                    for (let colecto = 0; colecto < arreglo[ruta].barrios.length; colecto++) {
                        if(this.origen === arreglo[ruta].barrios[colecto] || this.destino === arreglo[ruta].barrios[colecto]){
                            bandera = bandera + 1;
                        }
                    }
                    if (bandera == 2) {

                        dataRutas.push({
                            ruta:arreglo[ruta].nombre,
                            lat_origen:arreglo[ruta].lat_origen,
                            lng_origen:arreglo[ruta].lng_origen,
                            lat_destino:arreglo[ruta].lat_destino,
                            lng_destino:arreglo[ruta].lng_destino,
                            empresa:arreglo[ruta].empresa,
                            barrios: arreglo[ruta].barrios
                        });
                    }
                }

                if(dataRutas.length === 0) {
                    this.loadingDismiss();
                    this.animation = "out";
                    return;
                }

                for(let data of dataRutas){
                    this.rutasFinal.push({
                        'nombre': data.ruta,
                        'empresa': data.empresa,
                        'lat_origen':data.lat_origen,
                        'lng_origen':data.lng_origen,
                        'lat_destino':data.lat_destino,
                        'lng_destino':data.lng_destino,
                        'barrios': data.barrios
                    });
                }

                this.loadingDismiss();

                this.animation = null;

                console.log(this.rutasFinal);

                dataRutas = [];

            });
    }

    nuevaRuta(){
        this.animation = "in";
        this.rutasFinal = [];
        this.myForm.patchValue({
            origen: '',
            destino: ''
        });
    }

    cambioColorRuta(empresa){
        switch (empresa){
            case 'Sotracauca Mettro':
                return 'danger';
            case 'Rápido Tambo':
                return 'secondary';
            case 'Transpubenza':
                return 'primary';
            case 'Translibertad LTDA    ':
                return 'advertence';
        }
    }


    presentLoading() {
        this.loader = this.loadingCtrl.create({
            content: "Cargando rutas, por espere ...",
        });
        this.loader.present();
    }

    loadingDismiss(){
        this.loader.dismiss();
    }

    goToMap(data){
        console.log(data);
        let modal = this.modalCtrl.create(ModalRutasPage, {ruta: data});
        modal.present();
        //this.navCtrl.push(HomePage, {ruta: data});
    }
}
