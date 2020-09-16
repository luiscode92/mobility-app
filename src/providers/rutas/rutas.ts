import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {URL_SERVICIOS} from "../../config/config.mongodb";

@Injectable()
export class RutasProvider{

  constructor(public http: HttpClient) {}


    getAllRoutes(){
        const url = URL_SERVICIOS + '/ruta/All';
        return this.http.get(url)
            .map((resp: any) => {
                return resp;
            }).catch(err => {
                return Observable.throw(err);
            });
    };
}
