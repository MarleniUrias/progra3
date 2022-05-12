import { Component } from '@angular/core';
import { PersonaServicioService } from './servicio/persona-servicio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'proyecto-final';

  public mensaje: string = 'persona';

  constructor(private personaService: PersonaServicioService){
    this.personaService.getDataFromServer().subscribe(result =>{
      console.log('from subscription...');
      console.log(result)
      this.mensaje = this.mensaje + ' - ' + JSON.stringify(result);

    })
    
  }

  

}
