import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SPath } from '../Services/sPath';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private httpClient: HttpClient) {

  }
  getData( nroDocImport , nroGuia, fechadoc) {
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
    const body: String = '[{"Shipment_Number":"' +
    nroGuia + '","Nro_DeclaracionImportacion":"' +
    nroDocImport + '","Date_Declaracion":"' +
    fechadoc + '"}]';
     const json = JSON.stringify(body);
    console.log(body);
      // return this.httpClient.post<SPath>('https://az-am-exp-use-dev.azure-api.net/guiamaster/DocImportacion', body, { headers });
    return this.httpClient.post<SPath>('https://az-am-exp-use-dev.azure-api.net/documentoimportacion/DocImportacion', body, { headers });
    // return this.httpClient.post<SPath>('https://avapimgmtexpqa.azure-api.net/docImportacion', body, { headers });
    /*.subscribe(
      data => {
        console.log(data);
        return data;
      },
      error => {
        console.log('error', error);
        return null;
      }
    );*/
  }
}
