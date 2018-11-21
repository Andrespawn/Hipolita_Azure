import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SPathAduanas } from '../Services/SPathAduanas';

import { ConfigService } from '../ReadConfig/read-config';

@Injectable({
  providedIn: 'root'
})
export class AduanasService {

  urlService: any;

  constructor(private httpClient: HttpClient, private configService: ConfigService) {
    this.urlService = configService.loadJSON('./assets/config.json')['URL_ADUANAS_SERVICE'];
  }

  getData(nroGuia) {


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
    const body: String = '{"GuiaMaster":"' +
      nroGuia + '"}';

    //Transform to JSON
    const json = JSON.stringify(body);


    
    //Send POST
    return this.httpClient.post<SPathAduanas>(this.urlService, body, { headers });

  }
}
