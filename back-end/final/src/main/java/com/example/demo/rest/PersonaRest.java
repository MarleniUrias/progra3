package com.example.demo.rest;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.annotation.PostConstruct;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Persona;

import reactor.core.publisher.EmitterProcessor;
import reactor.core.publisher.Flux;

@CrossOrigin
@RestController
@RequestMapping("/persona")
public class PersonaRest {
	
	private EmitterProcessor<Persona> notificationProcessor;
	List<Persona> listaPersona = new ArrayList<>();

	
	
	@PostConstruct
	private void createProcessor() {
		notificationProcessor = EmitterProcessor.<Persona>create();
	}
	
	@GetMapping(value = "/notification/sse")
	public Flux<ServerSentEvent<Persona>> obtienePersonas(){
		
		return Flux.merge(getNotificationHeartbeat(), getPersonaSSE());
	}
	
	@PostMapping(value = "/creapersona")
	private ResponseEntity<?> create(@RequestBody Persona persona){		 
		
		listaPersona.add(persona);
		
		notificationProcessor.onNext(persona);
		
		return new ResponseEntity<>(persona, HttpStatus.OK);
		
		
	}
	
	
	
	private Flux<ServerSentEvent<Persona>> getNotificationHeartbeat(){
		return Flux.interval(Duration.ofSeconds(15))
				.map(i -> {
					
					return ServerSentEvent.<Persona>builder()
							.id(String.valueOf(i))
							.event("hearbeat-result")
							.data(null)
							.build();
					
				});
	}
	
	private Flux<ServerSentEvent<Persona>> getPersonaSSE(){
		return notificationProcessor
				.log()
				.map((persona) -> {
					System.out.println("Sending Persona: " + persona.getNombre());
					return ServerSentEvent.<Persona>builder()
							.id(UUID.randomUUID().toString())
							.event("persona-result")
							.data(persona)
							.build();
				}).concatWith(Flux.never());
	}
	
	
}
