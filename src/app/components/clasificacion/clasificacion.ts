import { CommonModule } from '@angular/common'; 
import { Component, OnInit } from '@angular/core'; 
import { Equipo } from '../../models/equipo'; 
import { Liga } from '../../services/liga'; 
import { RouterLink } from '@angular/router'; 
import { Partido } from '../partido/partido'; 

// Componente que muestra la tabla de clasificación
@Component({
  selector: 'app-clasificacion',
  imports: [CommonModule, RouterLink, Partido], // Módulos importados
  templateUrl: './clasificacion.html', 
  styleUrl: './clasificacion.css', 
})
export class Clasificacion implements OnInit {
  
  // Array de equipos para mostrar en la tabla
  equipos: Equipo[] = []; 
  
  // Inyección del servicio Liga
  constructor(private liga: Liga) {} 

  ngOnInit(): void { 

    // Carga los datos iniciales
    this.cargarClasificacion(); 
  }

  // Método para actualizar la tabla
  cargarClasificacion(): void { 

    // Obtiene equipos ordenados del servicio
    this.equipos = this.liga.obtenerClasificacion(); 
  }
}

