import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PantallainicioComponent } from './pantallainicio/pantallainicio.component';
import { GuiaMasterComponent } from './guia-master/guia-master.component';
import { ManifiestoAduanasComponent } from './manifiesto-aduanas/manifiesto-aduanas.component';
import { DocumentoImportacionComponent } from './documento-importacion/documento-importacion.component';
import { ImpresionEtiquetaComponent } from './impresion-etiqueta/impresion-etiqueta.component';
import { FacturacionComponent } from './facturacion/facturacion.component';
import { ReporteDiscrepanciasComponent } from './reporte-discrepancias/reporte-discrepancias.component';

import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AsignarGuiaMasterService } from './guia-master/asignarGuiaMaster.service';
import { DocumentService } from './documento-importacion/document.service';

import { NgxSpinnerModule } from 'ngx-spinner';

import { ConfigService } from './ReadConfig/read-config';
import { FacturasComercialesComponent } from './facturas-comerciales/consultar-factura-comercial.component';

import{ NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PantallainicioComponent,
    GuiaMasterComponent,
    ManifiestoAduanasComponent,
    DocumentoImportacionComponent,
    ImpresionEtiquetaComponent,
    FacturacionComponent,
    ReporteDiscrepanciasComponent,
    FacturasComercialesComponent
  ],
  imports: [
    NgxSpinnerModule,
    BrowserModule,
    HttpModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    NgbModule,
    NgxPaginationModule,
    RouterModule.forRoot(
      [

        {
          path: 'pantallainicio',
          component: PantallainicioComponent
        },
        {
          path: '',
          component: LoginComponent
        },
        {
          path: 'guiaMaster',
          component: GuiaMasterComponent
        },
        {
          path: 'manifiestoAduanas',
          component: ManifiestoAduanasComponent
        },
        {
          path: 'documentoImportacion',
          component: DocumentoImportacionComponent
        },
        {
          path: 'impresionEtiqueta',
          component: ImpresionEtiquetaComponent
        },
        {
          path: 'facturacion',
          component: FacturacionComponent
        },
        {
          path: 'reporteDiscrepancias',
          component: ReporteDiscrepanciasComponent
        },
        {
          path: 'facturaComercial',
          component: FacturasComercialesComponent
        }
      ]
    )
  ],
  providers: [
    HttpClient, 
    HttpModule, 
    AsignarGuiaMasterService, 
    DocumentService, 
    DocumentService,
    ConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
