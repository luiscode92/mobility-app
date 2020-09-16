import  { Component } from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsuarioProvider} from "../../providers/usuario/usuario";
import {AngularFireDatabase} from "angularfire2/database";
import {Camera, CameraOptions, EncodingType} from "@ionic-native/camera";
import {HomePage} from "../home/home";
import {Usuario} from "../../models/usuario.model";
import {URL_SERVICIOS} from "../../config/config.mongodb";
import {Base64} from "@ionic-native/base64";
import {LoginPage} from "../login/login";

//@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

    user = {
        _id: null,
        name: null,
        email: null,
        role: null,
        img: null
    };

    token = null;


    myForm: FormGroup;
    nombres:string = "";
    usuario:string = "";
    email:string = "";
    clave:string = "";
    image: string = null;
    notificacion:boolean;
    img: any = null;

    statusPassword = true;

    loading;



    constructor(	public navCtrl: NavController,
                    public navParams: NavParams,
                    private afDB: AngularFireDatabase,
                    private loadingCtrl:LoadingController,
                    private alertCtrl:AlertController,
                    private toastCtrl:ToastController,
                    public formBuilder: FormBuilder,
                    private usuarioProvider:UsuarioProvider,
                    private camera: Camera,
                    private base64: Base64) {

        this.myForm = this.createMyForm();

    }

    ionViewDidLoad(){
        this.usuarioProvider.cargarStorage().then(()=> {
            this.user._id = this.usuarioProvider.user._id;
            this.user.name = this.usuarioProvider.user.nombre;
            this.user.email = this.usuarioProvider.user.email;
            this.user.role = this.usuarioProvider.user.role;
            this.user.img = this.usuarioProvider.user.img;
            this.token = this.usuarioProvider.token;

        });
    }


    saveData(){

        let confirm = this.alertCtrl.create({
            title: 'Advertencia',
            message: 'Se cerrará la sesión, ¿Seguro que deseas salir?',
            buttons: [
                {
                    text: 'Cancelar',
                    handler: () => {
                    }
                },
                {
                    text: 'Aceptar',
                    handler: () => {

                        this.presentLoadingCustom();

                        this.nombres 		= 	this.myForm.value.nombre;
                        this.email 			= 	this.myForm.value.email;
                        this.clave 			= 	this.myForm.value.password;
                        this.email = this.email.toLowerCase();

                        let newUsuario = new Usuario(this.nombres, this.email, this.clave, this.user.img, this.user.role, false, this.user._id);

                        //alert(this.user.img);

                        /*this.subirArchivo(this.user.img, 'Usuarios', this.user._id).then(resp =>{
                            alert(JSON.stringify(resp));
                        }).catch(error =>{
                            alert(JSON.stringify(error));
                        });*/


                        this.usuarioProvider.updateUser(newUsuario, this.token, this.user._id).subscribe((resp => {

                            if (this.statusPassword !== true){
                                this.dismissLoadingCustom();
                                this.usuarioProvider.changePass(this.clave, this.user._id).subscribe(resp =>{
                                    console.log("Guardado correcto");
                                }, error =>{
                                    this.presentAlert("Ha ocurrido un error al cambiar la contraseña. " + JSON.stringify(error));
                                    this.dismissLoadingCustom();
                                });
                            }else {
                                this.dismissLoadingCustom();
                            }

                            this.presentToast();

                        }), (error)=>{
                            this.dismissLoadingCustom();
                            this.presentAlert(error.error);
                        });
                    }
                }
            ]
        });

        confirm.present();



    }

    private createMyForm(){

        return this.formBuilder.group({
            nombre: ['', [Validators.required, Validators.minLength(6)]],
            email: ['', [Validators.required, Validators.email]],
            password: [''],
            isChecked: [false],
        });
    }

    home(){
        this.navCtrl.setRoot(HomePage);
    }

    getTakePicture(){
        let options: CameraOptions = {
            destinationType: this.camera.DestinationType.DATA_URL,
            targetWidth: 100,
            encodingType: EncodingType.JPEG,
            targetHeight: 100,
            quality: 50
        };
        this.camera.getPicture( options )
            .then(imageData => {
                //this.user.img = `data:image/jpeg;base64,${imageData}`;
                this.user.img = imageData;
            })
            .catch(error =>{
                console.error( error );
            });
    }

    getGalleryPicture(){
        let options: CameraOptions = {
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            targetWidth: 100,
            targetHeight: 100,
            quality: 50
        };
        this.camera.getPicture( options )
            .then(imageData => {
                this.user.img = `data:image/jpeg;base64,${imageData}`;
            })
            .catch(error =>{
                console.error( error );
            });
    }

    takeImage(image){

        if (image === null || image === undefined || image === ''){
            return 'assets/recursos/usuario-logo.png';
        }else {
            return image;
        }
    }

    presentLoadingCustom() {
        this.loading = this.loadingCtrl.create({
            content: 'Guardando tus datos, por favor espera ...'
        });

        this.loading.present();
    }

    dismissLoadingCustom(){
        this.loading.dismiss();
    }

    presentAlert(text) {
        let alert = this.alertCtrl.create({
            title: 'Error al guardar los datos.',
            subTitle: text,
            buttons: ['Aceptar']
        });
        alert.present();
    }

    presentToast() {
        let toast = this.toastCtrl.create({
            message: 'Tu datos se han guardado correctamente.',
            duration: 3000,
            position: 'bottom'
        });

        toast.present();


        this.usuarioProvider.cerrarSession().then(()=>{
            this.usuarioProvider.cargarStorage();
            this.navCtrl.setRoot(LoginPage);
        });


    }


    subirArchivo( archivo, tipo: string, id:string){

        return new Promise((resolve, reject)=>{

            let formData = new FormData();
            let xhr = new XMLHttpRequest();

            formData.append('imagen', archivo, 'archivo.png');
            alert(formData);

            xhr.onreadystatechange = function (){
                if (xhr.readyState === 4){
                    if (xhr.status === 200){
                        resolve(JSON.parse(xhr.response));
                    }else{
                        console.log('Error en carga de imagen');
                        reject(xhr.response);
                    }
                }
            };

            let url = URL_SERVICIOS + '/upload/'+ tipo +'/'+id;
            xhr.open('PUT', url, true);
            xhr.send(formData);

        });
    }

    getChangePassword(){
        this.statusPassword = !this.statusPassword;
    }


    confirmChange(){



    }



}
