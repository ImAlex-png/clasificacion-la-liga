import { Injectable } from '@angular/core';
import { Equipo } from '../models/equipo';
@Injectable({
  providedIn: 'root',
})

// Servicio que gestiona la lógica de la liga de fútbol
export class Liga {

  private equipos: Equipo[] = [];

  // Historial de puntos por equipo
  private puntosHistory: Map<string, number[]> = new Map();

  constructor() {

    // Inicializa datos al instanciar
    this.cargarEquiposIniciales();
  }


  // Carga los 10 equipos con las estadísticas iniciales que tenías en JavaScript
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

    this.equipos = datosIniciales.map(datos => {
      const equipo = new Equipo(
        datos[0] as string,     // nombre
        datos[1] as number,     // puntos
        datos[2] as number,     // PJ
        datos[3] as number,     // PE
        datos[4] as number,     // PP
        datos[5] as number,     // GF
        datos[6] as number,     // GC
        datos[7] as number      // DG
      );

      this.puntosHistory.set(equipo.nombre, [equipo.puntos]);
      return equipo;
    });
  }

  obtenerClasificacion(): Equipo[] {
    // Devuelve copia (ya ordenada desde registrarResultado)
    return [...this.equipos];
  }

  // Registra resultado de partido y actualiza estadísticas
  registrarResultado(
    nombreLocal: string,
    nombreVisitante: string,
    golesLocal: number,
    golesVisitante: number
  ): boolean {
    // Valida equipos diferentes
    if (nombreLocal === nombreVisitante) {
      console.warn("Error: el equipo local y visitante no pueden ser el mismo");
      return false;
    }

    // Busca equipo local
    const local = this.equipos.find(e => e.nombre === nombreLocal);

    // Busca equipo visitante
    const visitante = this.equipos.find(e => e.nombre === nombreVisitante);

    // Valida existencia de equipos
    if (!local || !visitante) {
      console.warn("Error: uno o ambos equipos no existen");
      return false;
    }

    // Actualiza estadísticas de ambos equipos
    local.registrarResultado(golesLocal, golesVisitante);
    visitante.registrarResultado(golesVisitante, golesLocal);

    // Reordena clasificación por criterios de desempate
    this.equipos.sort((a: Equipo, b: Equipo) => {
      if (a.puntos !== b.puntos) {
        return b.puntos - a.puntos; // Más puntos primero
      }
      const difA = a.dg;
      const difB = b.dg;
      if (difA !== difB) {
        return difB - difA; // Mejor diferencia de goles
      }
      return b.gf - a.gf; // Más goles a favor
    });

    // Actualiza historial de puntos para ambos equipos
    this.puntosHistory.get(local.nombre)?.push(local.puntos);
    this.puntosHistory.get(visitante.nombre)?.push(visitante.puntos);

    return true;
  }

  // Busca equipo por nombre
  obtenerEquipoPorNombre(nombre: string): Equipo | undefined {
    return this.equipos.find(e => e.nombre === nombre);
  }

  // Retorna lista de nombres de equipos
  obtenerNombresEquipos(): string[] {
    return this.equipos.map(e => e.nombre);
  }

  // Retorna historial de puntos de un equipo
  obtenerHistorialPuntos(nombre: string): number[] {
    return this.puntosHistory.get(nombre) || [];
  }
}

