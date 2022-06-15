import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subscriber, throwError } from 'rxjs';
import { Persona } from '../modelo/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaServicioService {

  constructor(private http: HttpClient) { }

  public getDataFromServer(): Observable<any> {

    return new Observable( (observer: Subscriber<any>) => {

      let url = 'http://localhost:8089/persona/notification/sse';
      const eventSource = new EventSource(url);

      eventSource.addEventListener('persona-result', (message: any)=>{
        observer.next(message.data);
      });

      return () => eventSource.close();
    });
  }

  ingresaPersona(persona: Persona): Observable<any> {
    let url = 'http://localhost:8089/persona/creapersona';
    return this.http.post(url, persona).pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {      
      console.error('An error occurred:', error.error);
    } else {      
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
