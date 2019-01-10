import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SPathAduanas } from '../Services/SPathAduanas';

import { ConfigService } from '../ReadConfig/read-config';

@Injectable({
  providedIn: 'root'
})
export class AduanasService {

  urlService: any;
  private apimSubscriptionKey = this.configService.loadJSON('./assets/config.js')['APIM_SUBSCRIPTION_KEY'];

  constructor(private httpClient: HttpClient, private configService: ConfigService) {
    
  }

  getData(nroGuia) {

    this.urlService = this.configService.loadJSON('./assets/config.js')['URL_ADUANAS_SERVICE'];

    //Set headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'SOrigenCliente': 'Hipolita',
      'Scanal': 'Hipolita',
      'SUsuario': 'Hipolita',
      'Ocp-Apim-Subscription-Key': this.apimSubscriptionKey,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    });

    //Build body
    const body: String = '{"GuiaMaster":"' +
      nroGuia + '"}';

    //Transform to JSON
    const json = JSON.stringify(body);


    
    //Send POST
    return this.httpClient.post<SPathAduanas>(this.urlService, body, { headers , observe: 'response'});

  }
}
