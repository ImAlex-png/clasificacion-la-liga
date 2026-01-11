import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Liga } from '../../services/liga';
import { CommonModule } from '@angular/common';
import { Equipo } from '../../models/equipo';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts'; // Para gráficos
import { ChartConfiguration, ChartType } from 'chart.js'; // Tipos de Chart.js

// Componente que muestra la ficha detallada de un equipo
@Component({
  selector: 'app-ficha-equipo',
  imports: [CommonModule, RouterLink, BaseChartDirective], // Módulos importados
  providers: [provideCharts(withDefaultRegisterables())], // Proveedor para inicializar Chart.js
  templateUrl: './ficha-equipo.html',
  styleUrl: './ficha-equipo.css',
})
export class FichaEquipo implements OnInit {
  // Equipo actual o undefined si no encontrado
  equipo: Equipo | undefined;

  // Configuración del gráfico de evolución de puntos
  public lineChartData: ChartConfiguration['data'] = {
    // Etiquetas del eje X (se llenan dinámicamente)
    labels: [],

    datasets: [
      {
        // Datos del gráfico (se llenan dinámicamente)
        data: [],

        // Leyenda 
        label: 'Evolución de puntos',

        borderColor: '#0d47a1',

        backgroundColor: 'rgba(13, 71, 161, 0.2)',

        // Curvatura de la línea
        tension: 0.4,

        // Rellenar área bajo la línea
        fill: true
      }
    ]
  };

  // Opciones del gráfico
  public lineChartOptions: ChartConfiguration['options'] = {

    // Se adapta al tamaño

    responsive: true,

    plugins: {
      // Posición de la leyenda
      legend: { position: 'top' as const }
    },

    scales: {
      // Eje Y comienza en cero
      y: { beginAtZero: true }
    }
  };

  // Tipo de gráfico: línea
  public lineChartType: ChartType = 'line';

  // Inyección de dependencias
  constructor(private route: ActivatedRoute, private liga: Liga) { }

  ngOnInit(): void {

    // Obtiene parámetro de la URL
    const nombre = this.route.snapshot.paramMap.get('nombre');

    if (nombre) {

      // Busca el equipo
      this.equipo = this.liga.obtenerEquipoPorNombre(nombre);

      // Configura el gráfico con el historial de puntos
      if (this.equipo) {
        // Obtiene historial
        const historial = this.liga.obtenerHistorialPuntos(this.equipo.nombre);

        // Crea etiquetas
        const labels = historial.map((_, index) => index === 0 ? 'Inicial' : `Partido ${index}`);

        // Actualiza datos del gráfico
        this.lineChartData = {
          labels: labels,
          datasets: [{
            data: historial,
            label: 'Evolución de puntos',
            borderColor: '#0d47a1',
            backgroundColor: 'rgba(13, 71, 161, 0.2)',
            tension: 0.4,
            fill: true
          }]
        };
      }
    }
  }
}