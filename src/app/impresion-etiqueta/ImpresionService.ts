import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

import { SEtiqueta } from '../Services/sEtiqueta';


@Injectable({
  providedIn: 'root'
})
export class ImpresionService {

  constructor(private httpClient: HttpClient) {

  }
  getData( tipo , nroGuia) {
      const headers = new HttpHeaders({'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': '80336ece60c2410c86a8c7503170af68',
      'SOrigenCliente': 'Hipolita',
      'Scanal': 'Hipolita',
      'SUsuario': 'Hipolita',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    });
    console.log(headers.get('Ocp-Apim-Subscription-Key'));
    const body: String = '{ "ETIQUETAS":[{ "NRO_CONSULTAR":"' + nroGuia + '", "TIPO":"' + tipo + '" } ] }' ;
    console.log(body);
    return this.httpClient.post<SEtiqueta>('https://az-am-exp-use-dev.azure-api.net/Etiqueta/impEtiqueta2', body, { headers });
    /*.subscribe(data => {
        console.log(data);
         },
         error => {
          /* this.spinner.hide();
           this.mostrarMensajeErrorService = true;
           this.mensajeAlertaErrorService = '' + error.message;
           console.log('error', error.menssage());
           this.spinner.hide(););
      });*/
  }
}
