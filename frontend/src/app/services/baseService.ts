import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

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



  protected serverGet<T>(endpoint: string): Observable<T> {
    return new Observable<T>(observer => {
      this.http.get<ServerResponse<T>>(endpoint, this.httpOptions)
        .subscribe(serverRes => {
          if (serverRes.ok) {
            return observer.next(serverRes.result);
          }

          return observer.error(serverRes.error);
        }, observer.error);
    });
  }

  protected serverPost<T>(endpoint: string, data: any): Observable<T> {
    return new Observable<T>(observer => {
      this.http.post<ServerResponse<T>>(endpoint, data, this.httpOptions)
        .subscribe(serverRes => {
          if (serverRes.ok) {
            return observer.next(serverRes.result);
          }

          return observer.error(serverRes.error);
        }, observer.error);
    });
  }
}

interface ServerResponse<T> {
  ok: boolean;
  result: T;
  error: string;
}

