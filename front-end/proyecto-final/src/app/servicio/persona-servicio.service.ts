import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

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
}
