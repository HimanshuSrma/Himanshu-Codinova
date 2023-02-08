import { EventEmitter, Injectable, NgZone } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router ,NavigationEnd} from '@angular/router';
import { retry, catchError,timeout } from 'rxjs/operators';
declare var $:any;

@Injectable({
  providedIn: 'root'
})


export class ApiService {

  allData : any

  baseurl = "https://api.giphy.com/v1/gifs/trending?api_key=Dst7UyI10lCaZeA9seXlAWA2qaXf0uGY";

  constructor(private http:HttpClient,private router:Router,private zone:NgZone) {

  }




  apiCall(url: string): Observable<any>{

    return this.http.get(url).pipe(catchError(this.errorHandel));

  }



  errorHandel(error: { error: { message: string; }; status: number; message: any; }) {
    let that=this;
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

    }

    if (error.status == 401) {
      errorMessage = `Error Code: 401\nMessage: Http failure response for https://benepik.in/BPSA_NEW//api/getVouchers: 401 OK`
    }
    return throwError(errorMessage);
  }

}
