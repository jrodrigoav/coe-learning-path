import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { adoworkitem } from '../model/adoworkitem.interface';

const WEBSERVICE_API = "https://localhost:7123/api/centerofexcellence/"

@Injectable({
  providedIn: 'root'
})
export class AzuredevopsWorkitemsService {
  workItems: adoworkitem[] = [];

  constructor(private http: HttpClient) {

  }

    getAll(): Observable<adoworkitem[]> {
      let url = WEBSERVICE_API + 'getcommitedworkitems';
      return this.http.get<adoworkitem[]>(url);
    }


}
