import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SPathDiscrepacias } from '../Services/SPathDiscrepacias';

import { ConfigService } from '../ReadConfig/read-config';

@Injectable({
  providedIn: 'root'
})
export class DiscrepanciaServices {

  urlService: any;

  constructor(private httpClient: HttpClient, private configService: ConfigService) {
    
  }

  getData(fechaInicio, fechaFin) {

    this.urlService = this.configService.loadJSON('./assets/config.js')['URL_REPO_DISCREPANCIAS_SERVICE'];

    //Set headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'SOrigenCliente': 'Hipolita',
      'Scanal': 'Hipolita',
      'SUsuario': 'Hipolita',
      'Ocp-Apim-Subscription-Key': '80336ece60c2410c86a8c7503170af68',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    });

    //Build body
    const body: String = '{"Query": {"Date_start":"' +
      fechaInicio + '", "Date_end" : "' + fechaFin + '"}}';

    //Send POST
    return this.httpClient.post<SPathDiscrepacias>(this.urlService,
      body, { headers });

  }
}
