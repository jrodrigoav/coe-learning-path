import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor() {}

  login(model: any) {
    if (model.userName === 'admin' &&
      model.password === 'admin') {
      return true;
    } else {
      return false;
    }
  }

}
