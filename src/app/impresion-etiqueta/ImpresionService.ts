import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { SEtiqueta } from '../Services/sEtiqueta';

import { ConfigService } from '../ReadConfig/read-config';

@Injectable({
  providedIn: 'root'
})
export class ImpresionService {

  urlService: any;
  private apimSubscriptionKey = this.configService.loadJSON('./assets/config.js')['APIM_SUBSCRIPTION_KEY'];

  constructor(private httpClient: HttpClient, private configService: ConfigService) {
    

  }
  getData(tipo, nroGuia) {
    this.urlService = this.configService.loadJSON('./assets/config.js')['URL_IMP_ETIQUETA_SERVICE'];
    console.log('*****REQUEST URL***** ',this.urlService);

    //Set Headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': this.apimSubscriptionKey,
      'SOrigenCliente': 'Hipolita',
      'Scanal': 'Hipolita',
      'SUsuario': 'Hipolita',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    });
    console.log('*****REQUEST HEADERS***** ',headers);

    //Build body
    const body: String = '{ "ETIQUETAS":[{ "NRO_CONSULTAR":"' + nroGuia + '", "TIPO":"' + tipo + '" } ] }';
    console.log('*****REQUEST BODY***** ',body);

    //Send POST
    return this.httpClient.post<SEtiqueta>(this.urlService, body, { headers , observe: 'response'});
  }
}
