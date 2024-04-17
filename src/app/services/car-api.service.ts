import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ICar } from '../interfaces/car';

@Injectable({
  providedIn: 'root'
})
export class CarApiService {
  private _siteURL = 'http://localhost:5050/cars';

  constructor(private _http: HttpClient) {}

  getCarDetails(): Observable<ICar[]> {
    return this._http.get<ICar[]>(this._siteURL)
      .pipe(
        tap(data => console.log('car data/error' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  addCarDetails(car: ICar): Observable<ICar> {
    return this._http.post<ICar>(this._siteURL, car)
      .pipe(
        tap(data => console.log('add car message/error' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  delCarDetails(carId: string): Observable<void> {
    const deleteURL = `${this._siteURL}/${carId}`;
    return this._http.delete<void>(deleteURL)
      .pipe(
        tap(data => console.log('del car message/error' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse): Observable<any> {
    console.log('CarApiService: ' + err.message);
    return new Observable<any>((observer) => {
      observer.error(err.message);
    });
  }
}