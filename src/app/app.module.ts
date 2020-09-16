import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {Content, IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UsuarioProvider } from '../providers/usuario/usuario';

//Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from '../config/firebase.config';

//Ionic Image
import {IonicImageViewerModule} from "ionic-img-viewer";

//Storage
import { IonicStorageModule } from '@ionic/storage';

//Geolocation
import { Geolocation } from '@ionic-native/geolocation';
import { UbicacionProvider } from '../providers/ubicacion/ubicacion';
import { AgmCoreModule } from '@agm/core';

//Facebook
import { Facebook } from '@ionic-native/facebook';

//Google
import { GooglePlus } from "@ionic-native/google-plus";
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';

//Paginas
import { LoginPage } from '../pages/login/login';
import { RegistroPage } from '../pages/registro/registro';
import { OlvidoPassPage } from '../pages/olvido-pass/olvido-pass';
import { TurismoPage } from '../pages/turismo/turismo';
import { FavoritosPage } from '../pages/favoritos/favoritos';
import { CompartirPage } from '../pages/compartir/compartir';
import { OrigenDestinoPage } from '../pages/origen-destino/origen-destino';
import {PerfilPage} from "../pages/perfil/perfil";

//HttpClient
import { HttpClientModule } from "@angular/common/http";
import {IntroductionPage} from "../pages/introduction/introduction";
import {ModalPoliticasPage} from "../pages/modal-politicas/modal-politicas";
import {RutasPage} from "../pages/rutas/rutas";
import {Camera} from "@ionic-native/camera";
import { RutasProvider } from '../providers/rutas/rutas';
import {EmpresasPage} from "../pages/empresas/empresas";
import { EmpresaProvider } from '../providers/empresa/empresa';

import { AutoCompleteModule } from 'ionic2-auto-complete';
import { CompleteTestService } from '../providers/complete-test-service/complete-test-service';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { AgmDirectionModule } from 'agm-direction';
import {VerMasTurismoPage} from "../pages/ver-mas-turismo/ver-mas-turismo";

import {Base64} from "@ionic-native/base64";
import {Diagnostic} from "@ionic-native/diagnostic";
import {ModalRutasPage} from "../pages/modal-rutas/modal-rutas";





@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegistroPage,
    OlvidoPassPage,
    TurismoPage,
    FavoritosPage,
    CompartirPage,
    OrigenDestinoPage,
    PerfilPage,
    IntroductionPage,
    RutasPage,
    EmpresasPage,
    VerMasTurismoPage,
    ModalPoliticasPage,
    ModalRutasPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicImageViewerModule,
    HttpClientModule,
    AutoCompleteModule,
    BrowserAnimationsModule,
    AgmDirectionModule,
      IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyDn71L32gHGhwYwFNlhWw4FElZWjlZpWcQ',
        libraries: ["places"]
      })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegistroPage,
    OlvidoPassPage,
    TurismoPage,
    FavoritosPage,
    CompartirPage,
    OrigenDestinoPage,
    PerfilPage,
    IntroductionPage,
    RutasPage,
    EmpresasPage,
    VerMasTurismoPage,
    ModalPoliticasPage,
    ModalRutasPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioProvider,
    AngularFireDatabase,
    Camera,
    Base64,
    Diagnostic,
    Geolocation,
    NativeGeocoder,
    UbicacionProvider,
    Facebook,
    GooglePlus,
    RutasProvider,
    EmpresaProvider,
    CompleteTestService
  ]
})
export class AppModule {}
