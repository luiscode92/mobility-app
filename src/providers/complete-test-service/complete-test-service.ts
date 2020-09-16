import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {AutoCompleteService} from 'ionic2-auto-complete';
import 'rxjs/add/operator/map'
import {URL_SERVICIOS} from "../../config/config.mongodb";
import "rxjs/add/operator/debounceTime";

@Injectable()
export class CompleteTestService implements AutoCompleteService {
    labelAttribute = "nombre";

    constructor(private http:HttpClient) {}


    getResults(keyword:string) {

        const url = URL_SERVICIOS + '/barrio/All';
        return this.http.get(url)
            .map(
                (result: any) =>
                {
                    return result.barrios
                        .filter(item => item.nombre.toLowerCase().indexOf(keyword.toLowerCase()) > -1)
                });
    }
}

