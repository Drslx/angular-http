import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { catchError, Observable, retry, throwError } from "rxjs";

//
import { Car } from "../shared/models/car";

@Injectable({
  providedIn: "root",
})
export class CarService {
  urlApi = "http://localhost:3000/cars";

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) {}

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ "Content-type": "application/json" }),
  };

  getCars(): Observable<any> {
    return this.httpClient
      .get<Car[]>(this.urlApi)
      .pipe(retry(2), catchError(this.handleError));
  }

  getCarById(id: number): Observable<any> {
    return this.httpClient
      .get<Car>(this.urlApi + "/" + id)
      .pipe(retry(2), catchError(this.handleError));
  }

  saveCar(car: Car): Observable<any> {
    return this.httpClient
      .post<Car>(this.urlApi, JSON.stringify(car), this.httpOptions)
      .pipe(retry(2),
       catchError(this.handleError));
  }

  updateCar(car: Car): Observable<any> {
    return this.httpClient
      .put<Car>(
        this.urlApi + "/" + car.id,
        JSON.stringify(car),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteCar(car: Car) {
    return this.httpClient
      .delete<Car>(this.urlApi + "/" + car.id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage =
        `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
