import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, ObservableInput, of, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class BaseService {

  public endpoint = 'http://localhost:3000/api';
  public passengersEndpoint = this.endpoint + '/passengers';
  public spaceshipsEndpoint = this.endpoint + '/spaceships';
  public mothershipsEndpoint = this.endpoint + '/motherships';

  constructor(private http: HttpClient) {

  }

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    })
  };


  protected handleError<T>(httpErrorResponse: any, caught: Observable<T>): ObservableInput<T> {
    if (httpErrorResponse.error.error) {
      return throwError(httpErrorResponse.error.error);
    }

    return throwError(httpErrorResponse.error);
  }

  protected serverGet<T>(endpoint: string): Observable<T> {
    return this.http.get<ServerResponse<T>>(endpoint, this.httpOptions)
      .pipe(
        map(serverRes => serverRes.result as T),
        catchError(this.handleError)
      );
  }

  protected serverPost<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<ServerResponse<T>>(endpoint, data, this.httpOptions)
      .pipe(
        map(serverRes => serverRes.result as T),
        catchError(this.handleError)
      );
  }
}

interface ServerResponse<T> {
  ok: boolean;
  result: T;
  error: string;
}
