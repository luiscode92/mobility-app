
import { Component, ViewChild } from '@angular/core';
import {Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//PAGINAS
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TurismoPage } from '../pages/turismo/turismo';
import { FavoritosPage } from '../pages/favoritos/favoritos';
import { CompartirPage } from '../pages/compartir/compartir';

//SERVICIOS
import { UsuarioProvider } from '../providers/usuario/usuario';
import { UbicacionProvider } from '../providers/ubicacion/ubicacion';
import {PerfilPage} from "../pages/perfil/perfil";
import {IntroductionPage} from "../pages/introduction/introduction";
import {EmpresasPage} from "../pages/empresas/empresas";

declare var FCMPlugin;
@Component({
    templateUrl: 'app.html'
})


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

    @ViewChild('NAV') nav: any;

    pagesUsuario: Array<{ titulo: string, Component: any, icon: string, classStyle: string, iconRigth: string, activeButton: boolean }>;
    pagesAdmin: Array<{ titulo: string, Component: any, icon: string }>;

    rootPage: any;
    pagePerfil: any = PerfilPage;

    empresasPage = EmpresasPage;
    turismoPage = TurismoPage;
    rutasFavoritas = FavoritosPage;
    compartirPage = CompartirPage;
    homePage = HomePage;


    activeSubmenus: boolean = true;

    constructor(private platform: Platform,
                private statusBar: StatusBar,
                private splashScreen: SplashScreen,
                private _up: UsuarioProvider,
                private _ubicacion: UbicacionProvider,
                private alertCtrl: AlertController) {


        this.initializeApp();

        FCMPlugin.getToken(
            (t) => {
              console.log(t);
            },
            (e) => {
              console.log(e);
            }
          );
          
          FCMPlugin.onNotification(
            (data) => {
              console.log(data);
            },
            (e) => {
              console.log(e);
            }
          );

  }

  initializeApp() {
    this.platform.ready().then(() => {

      this._up.cargarStorage()
          .then(()=>{

              this.statusBar.styleDefault();
              this.splashScreen.hide();

            if (this._up.showTutorial === 'true'){
                this.rootPage = IntroductionPage;
            }else if(this._up.showTutorial === 'false' && this._up.isLogin === 'true'){
                this.rootPage = HomePage;
            }else{
                this.rootPage = LoginPage;
            }

          });
    });
  }

  ionViewDidLoad(){
      this.pagesUsuario = [
          {titulo:'Turismo', Component: TurismoPage, icon:'book', classStyle: 'myBg', iconRigth: '', activeButton: true},
          {titulo:'Favoritos', Component: false, icon:'heart', classStyle: 'myBg', iconRigth: 'ios-arrow-down-outline', activeButton: true},
          {titulo:'Rutas Favoritas', Component: FavoritosPage, icon:'heart', classStyle: 'myBg2', iconRigth: '', activeButton: this.activeSubmenus},
          {titulo:'Sitios Favoritos', Component: FavoritosPage, icon:'heart', classStyle: 'myBg2', iconRigth: '', activeButton: this.activeSubmenus},
          {titulo:'Compartir', Component: CompartirPage, icon:'share', classStyle: 'myBg', iconRigth: '', activeButton: true}
      ];

      this.pagesAdmin = [

      ];
  }

    /*initializeApp() {
        this.platform.ready().then(() => {

            this._up.cargarStorage().then(()=>{

                this.statusBar.styleDefault();
                this.splashScreen.hide();



            }).catch(()=>{
                alert("Error");
            });

        });
    }*/


   goToPage(page){
      this.activeSubmenus = true;
      this.nav.setRoot(page);
   }

    openSubMenus(){
      if (this.activeSubmenus === true){
          this.activeSubmenus = false;
      }else {
          this.activeSubmenus = true;
      }

    }

  salir(){

    let confirm = this.alertCtrl.create({
      title: 'Advertencia',
      message: '¿Seguro que deseas salir?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
              this._up.cerrarSession().then(()=>{
              this._up.cargarStorage();
              //this._ubicacion.detenerLocalizacion();
              this.nav.setRoot(LoginPage);
            });
          }
        }
      ]
    });

    confirm.present();
    
  }


  getTakePhoto(image){
      if (image === undefined || image === null || image === ''){
          return 'assets/recursos/usuario-logo.png';
      }else {
          return image;
      }
  }
}

