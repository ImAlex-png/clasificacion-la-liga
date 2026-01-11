import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Liga } from '../../services/liga';
import { CommonModule } from '@angular/common';
import { Equipo } from '../../models/equipo';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';  // ← Importar BaseChartDirective
import { ChartConfiguration, ChartType } from 'chart.js';  // ← Tipos para Chart.js

@Component({
  selector: 'app-ficha-equipo',
  imports: [CommonModule, RouterLink, BaseChartDirective],  // ← BaseChartDirective en imports
  providers: [provideCharts(withDefaultRegisterables())],  // ← Proveedor para charts
  templateUrl: './ficha-equipo.html',
  styleUrl: './ficha-equipo.css',
})
export class FichaEquipo implements OnInit {
  equipo: Equipo | undefined;

  // Configuración del gráfico (todo lo nuevo va aquí, no toca lo tuyo)
  public lineChartData: ChartConfiguration['data'] = {
    labels: [],  // Se actualizará
    datasets: [
      {
        data: [],  // Se actualizará
        label: 'Evolución de puntos',
        borderColor: '#0d47a1',        // Azul institucional
        backgroundColor: 'rgba(13, 71, 161, 0.2)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const }
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  public lineChartType: ChartType = 'line';

  constructor(private route: ActivatedRoute, private liga: Liga) { }

  ngOnInit(): void {
    const nombre = this.route.snapshot.paramMap.get('nombre');
    if (nombre) {
      this.equipo = this.liga.obtenerEquipoPorNombre(nombre);

      // Actualiza el gráfico con el historial de puntos
      if (this.equipo) {
        const historial = this.liga.obtenerHistorialPuntos(this.equipo.nombre);
        const labels = historial.map((_, index) => index === 0 ? 'Inicial' : `Partido ${index}`);
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