import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mostrarMensajeError: boolean;
  mensajeAlerta: string = "";
  usernameVoid: boolean;
  passwordVoid: boolean;

  constructor(private Auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  loginUser(event) {
    event.preventDefault();
    const target = event.target;

    const username = target.querySelector('#username').value;
    const password = target.querySelector('#password').value;

        this.mensajeAlerta = "";

    if (username == "") {
      
      this.mensajeAlerta = this.mensajeAlerta + "Usuario es requerido. ";
      this.mostrarMensajeError = true;
      this.usernameVoid = true;
    } else {
      this.usernameVoid = false;
    }

    if (password == "") {
      
      this.mensajeAlerta = this.mensajeAlerta + "Contraseña es requerido. ";
      this.mostrarMensajeError = true;
      this.passwordVoid = true;
    }
    else {
      this.passwordVoid = false;
    }

    if (!this.usernameVoid && !this.passwordVoid) {
      
      const logeoOk = this.Auth.getUserDetails(username, password)
      
      if (logeoOk) {
        this.router.navigate(['pantallainicio'])
      } else {
        event.preventDefault();
        this.mensajeAlerta = "Usuario y contraseña incorrectos";
        
        target.querySelector('#username').focus();
        target.querySelector('#username').value = ""
        target.querySelector('#password').value = "";
        this.mostrarMensajeError = true;

      }
    }
    
  }

}
