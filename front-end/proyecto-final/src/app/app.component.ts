import { Component } from '@angular/core';
import { Persona } from './modelo/persona';
import { PersonaServicioService } from './servicio/persona-servicio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  personas: Persona[] = [];
  persona = new Persona();

  public mensaje: string = 'persona';

  constructor(private personaService: PersonaServicioService){
    this.personaService.getDataFromServer().subscribe(result =>{
      let persona = new Persona();
      persona.nombre = JSON.parse(result).nombre;
      this.personas.push(persona);

    })    
  }

  ingresaPersona(){
    this.personaService.ingresaPersona(this.persona).subscribe(res =>{
      //console.log(res);
    });
  }

}
