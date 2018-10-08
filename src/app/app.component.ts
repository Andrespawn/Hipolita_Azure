import { Component, Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpClientModule, HttpResponse } from '@angular/common/http';
import { GuiaAsignacionInterface } from './guia-master/asignacion';

@Injectable()

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'login';


  body: GuiaAsignacionInterface = {
    Date_start: "", Date_end: "", Consulta: true, Guia_Alertran: ["505400041921"], Nro_GuiaMaster: "6788", Date_GuiaMaster: "2019-02-01"
  };


  //urlServe: string = '/cxf/AsignarGuiaMaster/AsignarGuiaMaster';

  constructor(private httpClient: HttpClient, private httpClientModule: HttpClientModule) {

  }

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  ngOnInit() {

/*
    let json = JSON.stringify(this.body);

    console.log(json);



    this.httpClient.post('http://172.20.6.6:8185/cxf/AsignarGuiaMaster/AsignarGuiaMaster', json, {
      headers: new HttpHeaders({ 'Access-Control-Allow-Origin': 'http://localhost:4200','Content-Type': 'application/json' })
    }).subscribe(
      HttpResponse => {
        console.log("Post request is successful", HttpResponse);
      },
      error => {
        console.log("error ", error);
      }
    );*/
    
  }

}