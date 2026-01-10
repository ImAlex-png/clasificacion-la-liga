import { Component } from '@angular/core';
import { Liga } from '../../services/liga';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  nombresEquipos: string[] = [];

  constructor(private liga: Liga) {
    this.nombresEquipos = this.liga.obtenerNombresEquipos();
  }

  registrarResultado() {
    const exito = this.liga.registrarResultado(
      this.local,
      this.visitante,
      this.golesLocal,
      this.golesVisitante
    );

    if (exito) {
      alert('¡Partido registrado correctamente!');
      this.reiniciarFormulario();
    } else {
      alert('Error: los equipos deben ser diferentes y deben existir');
    }
  }

  private reiniciarFormulario() {
    this.local = '';
    this.visitante = '';
    this.golesLocal = 0;
    this.golesVisitante = 0;
  }
}
