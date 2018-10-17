import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manifiesto-aduanas',
  templateUrl: './manifiesto-aduanas.component.html',
  styleUrls: ['./manifiesto-aduanas.component.css']
})
export class ManifiestoAduanasComponent implements OnInit {

msjValidacion:string = "";
mostarMsjValidacion:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  generarDocAduanas(event) {
    event.preventDefault();

    const target = event.target;
    const nroGuia: string = target.querySelector('#txtNroGuia').value;
    
if(nroGuia == ""){
  this.msjValidacion = "Debe diligenciar el campo 'Número Guía Master'";
  this.mostarMsjValidacion = true;
}else{
  this.msjValidacion = "";
  this.mostarMsjValidacion = false;
}

  }

}
