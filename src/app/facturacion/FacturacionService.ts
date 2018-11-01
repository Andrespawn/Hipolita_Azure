import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SPath } from '../Services/sPath';


@Injectable({
  providedIn: 'root'
})
export class FacturacionService {

  constructor(private httpClient: HttpClient) {

  }
  getData( DateStart , DateEnd, fechadoc, tipo) {
      const headers = new HttpHeaders({'Content-Type': 'application/json',
      'SOrigenCliente': 'Hipolita',
      'Scanal': 'Hipolita',
      'SUsuario': 'Hipolita',
      // 'Ocp-Apim-Subscription-Key': '80336ece60c2410c86a8c7503170af68',
       // 'Ocp-Apim-Subscription-Key': '5a14178462d24ca39fc93398ee444a91',
       'Ocp-Apim-Subscription-Key': '80336ece60c2410c86a8c7503170af68',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    });

    console.log(headers.get('Ocp-Apim-Subscription-Key'));
     // const body: String = '[{"Shipment_Number":"999031961893","Nro_DeclaracionImportacion":"44444","Date_Declaracion":"2018-09-21"}]';
    const body: String = '{"request":  { "Date_start":"' +
    DateStart + '","Date_end":"' +
    DateEnd + '"}}' ;
     const json = JSON.stringify(body);
    console.log(body);
      // return this.httpClient.post<SPath>('https://az-am-exp-use-dev.azure-api.net/guiamaster/DocImportacion', body, { headers });
      if (tipo === 'Facturacion Flete') {
        return this.httpClient.post<SPath>('https://az-am-exp-use-dev.azure-api.net/guiamaster/facturacionFlete', body, { headers });
      } else {
        return this.httpClient.post<SPath>('https://az-am-exp-use-dev.azure-api.net/guiamaster/facturacionimpuestos', body, { headers });
      }
  }
}
