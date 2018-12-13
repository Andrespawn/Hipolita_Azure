import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SPath } from '../Services/sPath';

import { ConfigService } from '../ReadConfig/read-config';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  urlService: any;

  constructor(private httpClient: HttpClient, private configService: ConfigService) {

  }

  getData(nroDocImport, nroGuia, fechadoc) {

    this.urlService = this.configService.loadJSON('./assets/config.js')['URL_DOC_IMPORTACION_SERVICE'];
    console.log('*****REQUEST URL***** ',this.urlService);

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
    console.log('*****REQUEST HEADERS***** ',headers);

    //Build Body
    const body: String = '[{"Shipment_Number":"' +
      nroGuia + '","Nro_DeclaracionImportacion":"' +
      nroDocImport + '","Date_Declaracion":"' +
      fechadoc + '"}]';
    console.log('*****REQUEST BODY***** ',body);

    //Transform to JSON
    const json = JSON.stringify(body);
    console.log('*****REQUEST  JSON***** ',json);

    //Send POST
    return this.httpClient.post<SPath>(this.urlService, body, { headers });

  }
}
