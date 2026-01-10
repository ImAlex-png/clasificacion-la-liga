import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Equipo } from '../models/equipo';

@Injectable({
  providedIn: 'root',
})
export class Liga {

  private equipos: Equipo[] = [];

  constructor() {
    this.cargarEquiposIniciales();
  }

  /**
   * Carga los 10 equipos con las estadísticas iniciales que tenías en JavaScript
   */
  private cargarEquiposIniciales(): void {
    const datosIniciales = [
      ["Real Madrid", 31, 12, 10, 1, 1, 28, 10],
      ["FC Barcelona", 26, 12, 8, 2, 2, 24, 12],
      ["Villarreal CF", 24, 12, 7, 3, 2, 20, 14],
      ["Atlético de Madrid", 22, 12, 6, 4, 2, 18, 12],
      ["Real Betis Balompié", 21, 12, 6, 3, 3, 17, 13],
      ["RCD Espanyol", 20, 12, 5, 5, 2, 16, 12],
      ["Athletic Club Bilbao", 16, 12, 4, 4, 4, 14, 15],
      ["Manchester United", 15, 12, 4, 3, 5, 12, 14],
      ["Bayern Múnich", 13, 12, 3, 4, 5, 10, 14],
      ["Juventus", 11, 12, 3, 2, 7, 9, 16]
    ];

    this.equipos = datosIniciales.map(datos =>
      new Equipo(
        datos[0] as string,     // nombre
        datos[1] as number,     // puntos
        datos[2] as number,     // PJ
        datos[3] as number,     // PG
        datos[4] as number,     // PE
        datos[5] as number,     // PP
        datos[6] as number,     // GF
        datos[7] as number      // GC
      )
    );
  }

  obtenerClasificacion(): Equipo[] {
    return [...this.equipos];  // Devuelve copia (ya ordenada desde registrarResultado)
  }

  registrarResultado(
    nombreLocal: string,
    nombreVisitante: string,
    golesLocal: number,
    golesVisitante: number
  ): boolean {
    if (nombreLocal === nombreVisitante) {
      console.warn("Error: el equipo local y visitante no pueden ser el mismo");
      return false;
    }

    const local = this.equipos.find(e => e.nombre === nombreLocal);
    const visitante = this.equipos.find(e => e.nombre === nombreVisitante);

    if (!local || !visitante) {
      console.warn("Error: uno o ambos equipos no existen");
      return false;
    }

    // Actualizamos estadísticas
    local.registrarResultado(golesLocal, golesVisitante);
    visitante.registrarResultado(golesVisitante, golesLocal);

    // ← SOLUCIÓN: ORDENAMOS EL ARRAY INTERNO AUTOMÁTICAMENTE
    this.equipos.sort((a: Equipo, b: Equipo) => {
      if (a.puntos !== b.puntos) {
        return b.puntos - a.puntos;
      }
      const difA = a.dg;
      const difB = b.dg;
      if (difA !== difB) {
        return difB - difA;
      }
      return b.gf - a.gf;
    });

    return true;
  }

  obtenerEquipoPorNombre(nombre: string): Equipo | undefined {
    return this.equipos.find(e => e.nombre === nombre);
  }

  obtenerNombresEquipos(): string[] {
    return this.equipos.map(e => e.nombre);
  }
}

