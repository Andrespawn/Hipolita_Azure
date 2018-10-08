import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { GuiaAsignacionInterface } from './asignacion';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AsignarGuiaMasterService {

  guias: Object = [];

  body: GuiaAsignacionInterface = {
    Date_start: '', Date_end: '', Consulta: true, Guia_Alertran: ['505400041921'], Nro_GuiaMaster: "6788", Date_GuiaMaster: "2019-02-01"
  };

  json = JSON.stringify(this.body);

  constructor(private httpClient: HttpClient) { 
  }

getData() {
  // this.httpClient.post('http://172.20.6.6:8185/cxf/AsignarGuiaMaster/AsignarGuiaMaster', this.json, {
  this.httpClient.post('https://avapimgmtexpqa.azure-api.net/GuiaMaster/AsignarGuiaMaster/AsignarGuiaMaster', this.json, {
  //  headers: new HttpHeaders({ 'Access-Control-Allow-Origin': 'http://localhost:4200','Content-Type': 'application/json' })
    }).subscribe(
      data => {
        this.guias = data;
        return this.guias;
      },
      error => {
        console.log('error', error);
      }
    );
  }

}
