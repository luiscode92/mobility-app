import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {URL_SERVICIOS} from "../../config/config.mongodb";

/*
  Generated class for the EmpresaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EmpresaProvider {

  constructor(public http: HttpClient) {}

    getAllEmpresas(){
        const url = URL_SERVICIOS + '/empresa';
        return this.http.get(url)
            .map((resp: any) => {
                return resp;
            }).catch(err => {
                return Observable.throw(err);
            });
    };

}
