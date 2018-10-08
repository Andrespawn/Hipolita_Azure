import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getUserDetails(username,password){
    if(username == 'Admin' && password == 'Admin'){
      return true;
    }else{
      return false;
    }
  }
}
