import { Component } from '@angular/core'; 
import { Liga } from '../../services/liga'; 
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 

// Componente para registrar resultados de partidos
@Component({
  selector: 'app-partido', 
  imports: [FormsModule, CommonModule], 
  templateUrl: './partido.html', 
  styleUrl: './partido.css', 
})

export class Partido {
  local: string = ''; 
  visitante: string = ''; 
  golesLocal: number = 0; 
  golesVisitante: number = 0; 

  // Lista de nombres de equipos para los selects
  nombresEquipos: string[] = []; 

  // Inyección del servicio Liga
  constructor(private liga: Liga) {
    
    // Carga nombres al inicializar
    this.nombresEquipos = this.liga.obtenerNombresEquipos();
  }

  // Método para registrar un partido
  registrarResultado() {
    const exito = this.liga.registrarResultado(
      this.local,
      this.visitante,
      this.golesLocal,
      this.golesVisitante
    );

    if (exito) {
      alert('¡Partido registrado correctamente!');
      this.reiniciarFormulario(); // Limpia el formulario
    } else {
      alert('Error: los equipos deben ser diferentes y deben existir');
    }
  }

  // Método privado para resetear campos
  private reiniciarFormulario() {
    this.local = '';
    this.visitante = '';
    this.golesLocal = 0;
    this.golesVisitante = 0;
  }
}
