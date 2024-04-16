import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ICar } from '../interfaces/car'; // Assuming ICAR is a typo and should be ICar

@Injectable({
  providedIn: 'root'
})
export class CarApiService {
  private _siteURL: string = 'http://localhost:5050'; // Update the URL as needed
  private _http: HttpClient;

  constructor(private http: HttpClient) {
    this._http = http;
  }

  getCarDetails():Observable<any> {

    return this._http.get<ICar>(this._siteURL)
    .pipe(
      tap(data => console.log('car data/error' + JSON.stringify(data))
    ),
    catchError(this.handleError)
    );
  }


  addCarDetails(car:ICar):Observable<any> {
   return this._http.post<ICar>(this._siteURL, car)
   .pipe(
    tap(data => console.log('add car message/error' + JSON.stringify(data))
    ),
    catchError(this.handleError)
    );
   }


  delCarDetails(carId:string):Observable<any> {
    let deleteURL=this._siteURL+":"+carId;
    return this._http.delete(deleteURL)
    .pipe(
      tap(data => console.log('del car message/error' + JSON.stringify(data))
    ),
    catchError(this.handleError)
    );
 
  }

  private handleError (err:HttpErrorResponse) {
    console.log('CarApiService: ' + err.message);
    return err.message;
  }

}
